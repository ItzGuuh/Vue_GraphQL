
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const port = 4000;

const filepath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filepath, 'utf-8');
const resolvers = require('./resolvers.js');

require('dotenv').config({ path: 'variables.env' });
const User = require('./models/user.js');
const Post = require('./models/post.js');

mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('DB Conntected!'))
    .catch(err => console.error(err));



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post,
    }
});

server.listen(port).then(() => {
    console.log("Server listening on %d...", port);
});
