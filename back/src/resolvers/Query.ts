import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";
import { User } from "../types";

const Query = {

    DeleteAll: async (parent: any) =>{
        try {
            const client = await connectDB();
            const db: Db = client;
            const users = await db.collection<User>("Users")
            await users.deleteMany({})
            return 0
        } catch (e) {
            return e
        }
    },

    LogIn: async (parent: any, User:User) => {
        const client = await connectDB();
        const db: Db = client;
        const users = await db.collection<User>("Users")

        const existeCorreo = await users.findOne({ email: User.email })

        if(!existeCorreo){
            return 1
        }else{
            if(existeCorreo.password!=User.password){
                return 2
            }else{
                if(existeCorreo.status!="Able"){
                    return 3
                }else{
                    return 0
                }
            }
        }
    },

    GetId: async (parent: any, User:User) =>{
        try {
            const client = await connectDB();
            const db: Db = client;
            const users = await db.collection<User>("Users")
            
            const existe=await users.findOne({email:User.email})
            if (!existe){
                return "1"
            }else{
                return (existe.id).toString()
            }
            
        } catch (e) {
            return e
        }
    },
}  


export {Query}