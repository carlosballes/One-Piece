import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaLogin.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const LogIn = gql`
      query LogIn($email:String!,$password:String!){
        LogIn(email:$email, password:$password)
}
`

const GetId = gql`
      query GetId($email:String!){
        GetId(email:$email)
}
`

const PantallaLogin: FC<{}> =()=>{

    //Navigate usado para navegar a una páguina cuando no quieres usar un Link
    const navigate= useNavigate()
    const [mostrarPassword,setMostrarPassword]=useState<boolean>(false)
    const [errorQuery,setError]=useState<number>(0)

    //UseStates
    const [Email,setEmail]= useState<string>("")
    const [Password,setPassword]=useState<string>("")

    const [LogInQuery, {data,loading,error,refetch} ] = useLazyQuery(LogIn, { 
        variables: {email:Email,password:Password}
    })

    const [GetIdQuery, {data:data2,loading:loading2,error:error2,refetch:refetch2} ] = useLazyQuery(GetId, { 
        variables: {email:Email}
    })
    
    if(error || error2) return <div>Error</div>

    //Función que llama a la mutation LogIn
    async function ejecutarQueryLogIn(datos:any) {
        
        let datosQuery=await datos
        if(datosQuery.data.LogIn == 0){
            const GetID=await GetIdQuery()
            if(GetID.data.GetId!="1"){
                navigate(`/home/${GetID.data.GetId}`)
            }   
        }else{
            setError(datosQuery.data.LogIn)
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
                        <div id="Input1_PantallaLogin">
                            <input type="text" placeholder="Email" onChange={(e:any)=>{setEmail(e.target.value)}} value={Email} required/> 
                           
                        </div>
                        <div id="Input2_PantallaLogin">
                            <input type={mostrarPassword ? "text" : "password"} placeholder="Password" onChange={(e:any)=>{setPassword(e.target.value)}} value={Password} required/> 
                            <button onClick={()=>{setMostrarPassword(!mostrarPassword)}}><img src={mostrarPassword ? "https://image.shutterstock.com/image-vector/icon-line-password-show-design-600w-1757433218.jpg" : "https://image.shutterstock.com/image-vector/no-eye-icon-avoid-contact-600w-1329018929.jpg"} /></button> 

                        </div>
                    </div>
                    <div id="BotonInicio_PantallaLogin">
                        <button onClick={()=>{const queryLogin=LogInQuery({variables:{email:Email,password:Password}}); ejecutarQueryLogIn(queryLogin); setTimeout(()=>{setError(0)},3000)}}><p><b>INICIA SESIÓN</b></p></button>
                    </div>
                </div>
                {error!=0 && <div id="ParteErrores">
                    {errorQuery==1 && <p>El correo no existe</p>}
                    {errorQuery==2 && <p>Contraseña incorrecta</p>}
                    {errorQuery==3 && <p>Esta cuenta no está habilitada</p>}
                </div>}
                <div id="ParteBaja_PantallaLogin">
                    <div id="Registrar_PantallaLogin">
                        <p>¿Aún no estás registrado? Pulse <Link to="/register">aquí</Link> para registrarte</p>
                        <p>¿Has olvidado tu contraseña? Pulse <Link to="/forgotPassword">aquí</Link></p>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default PantallaLogin