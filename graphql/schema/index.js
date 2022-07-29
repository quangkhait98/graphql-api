const { buildSchema } = require('graphql')


module.exports = buildSchema(`

  type User {
    _id: ID!
    full_name: String!
    phone: String!
    email: String!
    age: Int!
    gender: String!
  }

  type Order {
    _id: ID!
    amount: Int!
    interest_rate: Float!
    code: String!
    user: String!
  }

  type UserResult{
    _id: ID!
    full_name: String!
    phone: String!
    age: Int!
    gender: String!
    total_amount: Int!
  }

  type OrderResult {
    _id: ID!
    code: String!
    user: String!
    amount: Int!,
    accrued_amount : [Int!]!
  }
  
  
  input CreateUserInput {
    full_name: String!
    phone: String!
    email: String!
    age: Int!
    gender: String!
  }
  input UpdateUserInput {
    _id: ID!
    full_name: String
    phone: String
    email: String
    age: Int
    gender: String
  }

  input CreateOrderInput {
    user: String!
    amount: Int!
    interest_rate: Float!
  }

  input GetManyOrder {
    user: String!
  }
  
  input GetOneOrder {
    _id: ID!
  }
  
  
  type Query {
    users:[UserResult!]
    getManyOrder(order:GetManyOrder): [OrderResult!],
    getOneOrder(order:GetOneOrder): OrderResult!,
  }

  type Mutation {
    createUser(user:CreateUserInput): UserResult,
    updateUser(user:UpdateUserInput): UserResult,
    createOrder(order:CreateOrderInput): OrderResult,
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)