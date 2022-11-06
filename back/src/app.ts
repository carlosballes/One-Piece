import { ApolloError, ApolloServer, gql } from "apollo-server";
import {Db, MongoClient} from "mongodb";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import {Query} from "./resolvers/Query"
import {Mutation} from "./resolvers/Mutation"


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