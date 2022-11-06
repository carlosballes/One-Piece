import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";


export const Mutation = {

    SignIn: async (parent: any, { email, pwd }: any) => {
        return "Hola"
    },

}