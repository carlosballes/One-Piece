import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaRegistro.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const Registrar = gql`
      mutation Registrar($email:String!,$name:String!,$surname:String!,$password:String!){
        LogIn(email:$email,name:$name, surname:$surname password:$password)
}
`

const GetId = gql`
      query GetId($email:String!){
        GetId(email:$email)
}
`

const PantallaRegistro: FC<{}> =()=>{

    //Navigate usado para navegar a una páguina cuando no quieres usar un Link
    const navigate= useNavigate()
    const [mostrarPassword,setMostrarPassword]=useState<boolean>(false)
    const [errorQuery,setError]=useState<number>(0)

    //UseStates
    const [Email,setEmail]= useState<string>("")
    const [Password,setPassword]=useState<string>("")
    const [Password2,setPassword2]=useState<string>("")
    const [Surname,setSurname]=useState<string>("")
    const [Name,setName]=useState<string>("")

    const [LogInQuery, {data,loading,error,refetch} ] = useLazyQuery(Registrar, { 
        variables: {email:Email,password:Password}
    })

    const [GetIdQuery, {data:data2,loading:loading2,error:error2,refetch:refetch2} ] = useLazyQuery(GetId, { 
        variables: {email:Email}
    })
    
    if(error || error2) return <div>Error</div>

    //Función que llama a la mutation LogIn
    async function ejecutarMutationRegistro(datos:any) {
        
        let datosQuery=await datos
        if(datosQuery.data.LogIn == 0){
            const GetID=await GetIdQuery()
            if(GetID.data.GetId!="1"){
                navigate(`/home/${GetID.data.GetId}`)
            }   
        }else if(datosQuery.data.LogIn == 1){
            setError(1)
        }else if(datosQuery.data.LogIn == 2){
            setError(2)
        }else{
            setError(3)
        }
    }

    return(
        <div id="PantallaRegistro">
           <div id="PedirDatos_PantallaRegistro">
                <div id="ParteArriba_PantallaRegistro">
                    <div id="BotonAtras_PantallaRegistro">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}><p>←</p></Link>
                    </div>
                    <div id="TextoInicioSesion_PantallaRegistro">
                            <p><b>Registrarse</b></p>
                    </div>
                </div>
                <div id="ParteDatos_PantallaRegistro">
                    <div id="Inputs_PantallaRegistro">
                        <div id="Input1_PantallaRegistro">
                            <input type="text" placeholder="Email" onChange={(e:any)=>{setEmail(e.target.value)}} value={Email} required/> 
                           
                        </div>

                        <div id="Input2_PantallaRegistro">
                            <input type="text" placeholder="Name" onChange={(e:any)=>{setName(e.target.value)}} value={Name} required/> 
                           
                        </div>

                        <div id="Input3_PantallaRegistro">
                            <input type="text" placeholder="Surname" onChange={(e:any)=>{setSurname(e.target.value)}} value={Surname} required/> 
                           
                        </div>

                        <div id="Input4_PantallaRegistro">
                            <input type={mostrarPassword ? "text" : "password"} placeholder="Password" onChange={(e:any)=>{setPassword(e.target.value)}} value={Password} required/> 
                            <button onClick={()=>{setMostrarPassword(!mostrarPassword)}}><img src={mostrarPassword ? "https://image.shutterstock.com/image-vector/icon-line-password-show-design-600w-1757433218.jpg" : "https://image.shutterstock.com/image-vector/no-eye-icon-avoid-contact-600w-1329018929.jpg"} /></button> 

                        </div>

                        <div id="Input5_PantallaRegistro">
                            <input type={mostrarPassword ? "text" : "password"} placeholder="Password" onChange={(e:any)=>{setPassword(e.target.value)}} value={Password} required/> 
                            <button onClick={()=>{setMostrarPassword(!mostrarPassword)}}><img src={mostrarPassword ? "https://image.shutterstock.com/image-vector/icon-line-password-show-design-600w-1757433218.jpg" : "https://image.shutterstock.com/image-vector/no-eye-icon-avoid-contact-600w-1329018929.jpg"} /></button> 

                        </div>

                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default PantallaRegistro