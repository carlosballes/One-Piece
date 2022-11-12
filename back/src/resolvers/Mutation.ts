import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";
import { User } from "../types";
import { v4 as uuidv4 } from 'uuid';

function aleatorio() {
    let codigo = ""

    for (let i = 0; i < 6; i++) {
        codigo += Math.floor(Math.random() * 10);
    }
    return codigo
}

export const Mutation = {

    Registrar: async (parent: any, { User }: any) => {
        try {
            const client = await connectDB();
            const db: Db = client;
            const users = await db.collection<User>("Users")

            const existe = await users.findOne({ email: User.email })

            if (existe) {
                return 1
            } else {
                const id = uuidv4()
                await users.insertOne({ id: id, email: User.email, name: User.name, pwd: User.pwd, code: aleatorio(), status: false })
            }
        } catch (e) {
            return e
        }
    },

    StatusOn: async (parent: any, { User }: any) => {
        const client = await connectDB();
        const db: Db = client;
        const users = await db.collection<User>("Users")

        const existe = await users.findOne({ email: User.email })

        if(!existe){
            return 1
        }else{
            if(existe.code==User.code){
                await users.updateOne({id:User.id},{$set:{status:true}})
            }
        }
    },

    LogIn: async (parent: any, { User }: any) => {
        const client = await connectDB();
        const db: Db = client;
        const users = await db.collection<User>("Users")

        const existe = await users.findOne({ email: User.email })

        if(!existe){
            return 1
        }else{
            if(existe.pwd!=User.pwd || existe.status==false){
                return 1
            }
        }
    },

}