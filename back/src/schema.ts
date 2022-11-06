import { gql } from "apollo-server";

export const typeDefs = gql `
type Query{  
    getUsers:String!
}
type Mutation{
    SignIn:String!
}
`