import { gql } from "apollo-server";

export const typeDefs = gql `

type Query{  
    LogIn(email:String!,password:String!):Int!
    DeleteAll:Int!
}
type Mutation{
    Registrar(email:String!,name:String!,surname:String!,password:String!):Int!
    AbleAccount(id:String!,code:String!):Int!
    ForgotPassword(email:String!):Int!
}
`