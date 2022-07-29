const User = require("../../models/user");
const Order = require("../../models/order");
var generatePassword = require("password-generator");
const { get } = require("lodash")
module.exports = {
  users: async () => {
    try {
      const usersFetched = await User.find();
      return usersFetched.map(async (user) => {
        const sum_val = await Order.aggregate([{ $match: { user: user._id } }, { $group: { _id:null, sum: { $sum: "$amount" } } }]);
        return {
          ...user._doc,
          total_amount: !get(sum_val[0], 'sum') ? 0 : get(sum_val[0], 'sum'),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  createUser: async (args) => {
    try {
      const { full_name, phone, email, age, gender } = args.user;
      if(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone) === false){
        throw Error('PHONE_NUMBER_ERROR')
      }
      const user = new User({
        full_name,
        phone,
        email,
        age,
        gender,
      });
      const newUser = await user.save();
      return  { ...newUser._doc, total_amount: 0 };
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (args) => {
    try {
      const { _id, full_name, phone, email, age, gender } = args.user;
      const exist = await User.findOne({ _id: _id });
      if (!exist) {
        throw new Error("User Not Found");
      }
      delete args.user._id;
      const user = await User.findOneAndUpdate({ _id: _id }, { ...args.user });
      if (!user) {
        throw new Error("error");
      }
      const sum_val = await Order.aggregate([{ $match: { user: user._id } }, { $group: { _id:null, sum: { $sum: "$amount" } } }]);
      return { ...(await User.findOne({ _id: _id })), total_amount: !get(sum_val[0], 'sum') ? 0 : get(sum_val[0], 'sum'), };
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (args) => {
    try {
      const code = generatePassword(5, false, /\d/);
      const { user, amount, interest_rate } = args.order;
      const order = new Order({
        user,
        amount,
        interest_rate,
        code,
      });
      const newOrder = await order.save();
      return newOrder;
    } catch (error) {
      throw error;
    }
  },

  getManyOrder: async (args) => {
    try {
      const { user } = args.order;
      const orders = await Order.find({ user });
      return orders;
    } catch (error) {
      throw error;
    }
  },

  getOneOrder: async (args) => {
    try {
      const { _id } = args.order;
      const order = await Order.findOne({ _id });
      return order;
    } catch (error) {
      throw error;
    }
  },
};
