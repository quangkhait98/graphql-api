const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
require('dotenv').config()
const app = express();

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

const uri = process.env.MONGO_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() => app.listen(process.env.SERVER_PORT, console.log("Server is running")))
  .catch((error) => {
    throw error;
  });
