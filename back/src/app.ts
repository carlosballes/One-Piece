import { ApolloError, ApolloServer, gql } from "apollo-server";
import {Db, MongoClient} from "mongodb";
import { connectDB } from "./mongo.ts";
import { typeDefs } from "./schema.ts";
import {Query} from "./resolvers/Query.ts"
import {Mutation} from "./resolvers/Mutation.ts"


const resolvers ={
    Query,
    Mutation
}

const run = async () =>{
    await connectDB();
    const server = new ApolloServer({typeDefs, resolvers});

    server.listen(4000).then(()=>{
    console.log(`Server escuchando en el puerto 4000`)
})}

run();