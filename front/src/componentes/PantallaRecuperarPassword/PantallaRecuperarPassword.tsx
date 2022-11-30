import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaRecuperarPassword.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const ForgotPassword = gql`
      mutation ForgotPassword($email:String!){
        ForgotPassword(email:$email)
}
`

const PantallaRecuperarPassword: FC<{}> =()=>{

    //Navigate usado para navegar a una páguina cuando no quieres usar un Link
    const navigate= useNavigate()
    const [errorOlvido,setErrorOlvido]=useState<number>(0)

    //UseStates
    const [Email,setEmail]= useState<string>("")
    

    const [ForgotPasswordMutacion] = useMutation(ForgotPassword, { 
        variables: {email:Email}
    })

    //Función que llama a la mutation LogIn
    async function ejecutarMutationOlvido(){
        const olvido=await ForgotPasswordMutacion()
        if(olvido.data.ForgotPassword==0){
            navigate("/login")
        }else{
            setErrorOlvido(olvido.data.ForgotPassword)
            setTimeout(()=>{setErrorOlvido(0)},3000)
        }
        
        
    }

    return(
        <div id="PantallaPantallaRecuperarPassword">
            <div id="PedirDatos_PantallaRecuperarPassword">
                <div id="ParteArriba_PantallaRecuperarPassword">
                    <div id="BotonAtras_PantallaRecuperarPassword">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}><p>←</p></Link>
                    </div>
                    <div id="TextoInicioSesion_PantallaRecuperarPassword">
                            <p><b>Recordar contraseña</b></p>
                    </div>
                </div>
                <div id="ParteDatos_PantallaRecuperarPassword">
                    <div id="Inputs_PantallaRecuperarPassword">
                        <div id="TextoInput_PantallaRecuperarPassword">
                            <p>Introduce tu dirección de Email</p>
                        </div>
                        <div id="Input1_PantallaRecuperarPassword">
                            <input type="text" placeholder="Email" onChange={(e:any)=>{setEmail(e.target.value)}} value={Email} required/> 
                           
                        </div>
                        
                    </div>
                    <div id="BotonInicio_PantallaRecuperarPassword">
                        <button onClick={()=>{ejecutarMutationOlvido()}}><p><b>Recordar</b></p></button>
                    </div>
                </div>
                {errorOlvido!=0 && <div id="ParteErrores">
                    {errorOlvido==1 && <p>El correo no existe</p>}
                    {errorOlvido==2 && <p>Debes introducir una direccion de correo</p>}
                </div>}
            </div>
            
        </div>
        
    )
}

export default PantallaRecuperarPassword