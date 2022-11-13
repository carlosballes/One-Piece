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
            console.log("No existe el correo")
            return 1
        }else{
            if(existeCorreo.password!=User.password){
                console.log("La contraseña no es correcta")
                return 2
            }else{
                if(existeCorreo.status!="Able"){
                    console.log("Cuenta no habilitada")
                    return 3
                }else{
                    console.log("Todo correcto")
                    return 0
                }
            }
        }
    },
}  


export {Query}