import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaLogin.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const LogIn = gql`
      query LogIn($email:String!,$password:String!){
        LogIn(email:$email, password:$password)
}
`

const PantallaLogin: FC<{}> =()=>{

    //Navigate usado para navegar a una páguina cuando no quieres usar un Link
    const navigate= useNavigate()

    //UseStates
    const [Email,setEmail]= useState<string>("")
    const [Password,setPassword]=useState<string>("")

    const [LogInQuery, {data,loading,error,refetch} ] = useLazyQuery(LogIn, { 
        variables: {email:Email,password:Password}
    })
    
    if(error) return <div>Error</div>

    //Función que llama a la mutation LogIn
    async function ejecutarQueryLogIn() {
        const misDatos=await LogInQuery()
        
        if(misDatos.data.LogIn == 0){
            navigate("/home")
        }else if(misDatos.data.LogIn == 1){
            console.log(misDatos.data.LogIn)
        }else if(misDatos.data.LogIn == 2){
            console.log(misDatos.data.LogIn)
        }else{
            console.log(misDatos.data.LogIn)
        }
    }

    return(
        <div id="PantallaLogin">
            <div id="PedirDatos_PantallaLogin">
                <div id="ParteArriba_PantallaLogin">
                    <div id="BotonAtras_PantallaLogin">
                        <Link to="/" style={{ textDecoration: 'none', color: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}><p>←</p></Link>
                    </div>
                    <div id="TextoInicioSesion_PantallaLogin">
                            <p><b>INICIO SESIÓN</b></p>
                    </div>
                </div>
                <div id="ParteDatos_PantallaLogin">
                    <div id="Inputs_PantallaLogin">
                        <input type="text" placeholder="Email" onChange={(e:any)=>{setEmail(e.target.value)}} value={Email} required/> 
                        <input type="password" placeholder="Password" onChange={(e:any)=>{setPassword(e.target.value)}} value={Password} required/>  
                        
                    </div>
                    <div id="BotonInicio_PantallaLogin">
                        <button onClick={()=>ejecutarQueryLogIn()}><p><b>INICIA SESIÓN</b></p></button>
                    </div>
                </div>
                <div id="ParteBaja_PantallaLogin">
                    <div id="Registrar_PantallaLogin">
                        <p>¿Aún no estás registrado? Pulse <Link to="/register">aquí</Link> para registrarte</p>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default PantallaLogin