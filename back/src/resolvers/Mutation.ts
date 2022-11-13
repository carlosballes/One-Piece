import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";
import { User } from "../types";
import { v4 as uuidv4 } from 'uuid';
import {transporter} from '../email'

//FUNCIÓN PARA GENERAR CODIGO DE SEGURIDAD ALEATORIO
function aleatorio(cantidad:number) {
    let codigo = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code=""
    for (let i = 0; i < cantidad; i++) {
        code += codigo[Math.floor(Math.random() * codigo.length)];
    }
    return code
}

export const Mutation = {

    Registrar: async (parent: any, User:User) => {
        try {
            const client = await connectDB();
            const db: Db = client;
            const users = await db.collection<User>("Users")

            const existe = await users.findOne({ email: User.email })

            if (existe) {
                console.log("Ya existe un usuario con este correo")
                return 1    
            } else {
                const id = uuidv4()
                const code = aleatorio(6)
                await users.insertOne({ id: id, email: User.email, name: User.name, surname: User.surname, password: User.password, code: code, status: "Disable" })
                transporter.sendMail(
                    {
                        from: "cuentaparacosas20189@gmail.com",
                        to: User.email,
                        subject: "REGISTRO ONE D. SPORT",
                        html: `<br>Te has registrado en la aplicacion con el nombre <b>${User.name}</b></br> <br>Tu código de verificacion es: <b>${code}</b></br>`
                    }
                )
                return 0
            }
        } catch (e) {
            return e
        }
    },

    
    AbleAccount: async (parent: any, User:User) => {
        const client = await connectDB();
        const db: Db = client;
        const users = await db.collection<User>("Users")

        const existe = await users.findOne({ id: User.id })

        if(!existe){
            console.log("No existe este ID")
            return 1
        }else{
            if(existe.status=="Able"){
                console.log("Ya esta habilitada")
                return 2
            }else{
                if(existe.code!=User.code){
                    console.log("El código no es correcto")
                    return 3        
                }else{
                    await users.updateOne({id:User.id},{$set:{status:"Able"}})
                    console.log("Todo correcto")
                    return 0
                }
        }
        }
    },

    ForgotPassword: async (parent: any, User:User) => {
        const client = await connectDB();
        const db: Db = client;
        const users = await db.collection<User>("Users")

        const existe = await users.findOne({ email: User.email })
        const contraseñaNueva = aleatorio(10)
        if(!existe){
            console.log("No existe este email")
            return 1
        }else{
            await users.updateOne({email:User.email},{$set:{password:contraseñaNueva}})
            transporter.sendMail(
                {
                    from: "cuentaparacosas20189@gmail.com",
                    to: User.email,
                    subject: "NUEVA CONTRASEÑA ONE D. SPORT",
                    html: `<br>Hola <b>${existe.name}</b></br> <br>Tu nueva contraseña es:  <b>${contraseñaNueva}</b></br>`
                }
            )
            return 0
        }
    },

    
}