import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaRegistro.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const Registrar = gql`
      mutation Registrar($email:String!,$name:String!,$surname:String!,$password:String!){
        Registrar(email:$email,name:$name, surname:$surname password:$password)
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
    const [mostrarPassword2,setMostrarPassword2]=useState<boolean>(false)
    const [errorRegistro,setErrorRegistro]=useState<number>(0)


    //UseStates
    const [Email,setEmail]= useState<string>("")
    const [Password,setPassword]=useState<string>("")
    const [Password2,setPassword2]=useState<string>("")
    const [Surname,setSurname]=useState<string>("")
    const [Name,setName]=useState<string>("")

    const [RegistrarMutacion] = useMutation(Registrar, { 
        variables: {email:Email, name:Name, surname:Surname, password:Password}
    })

    const [GetIdQuery, {data:data2,loading:loading2,error:error2,refetch:refetch2} ] = useLazyQuery(GetId, { 
        variables: {email:Email}
    })

    async function ejecutarMutation(){
        const registro=await RegistrarMutacion()
        if(Password==Password2){
            if(registro.data.Registrar==0){
                const GetID=await GetIdQuery()
                console.log(GetID.data.GetId)
                if(GetID.data.GetId!="1"){
                    navigate(`/checkcode/${GetID.data.GetId}`)
                } 
            }else{
                setErrorRegistro(registro.data.Registrar)
                setTimeout(()=>{setErrorRegistro(0)},3000)
            }
        }else{
            setErrorRegistro(4)
            setTimeout(()=>{setErrorRegistro(0)},3000)
        }
        
    }

    return(
        <div id="PantallaRegistro">
           <div id="PedirDatos_PantallaRegistro">
                <div id="ParteArriba_PantallaRegistro">
                    <div id="BotonAtras_PantallaRegistro">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}><p>←</p></Link>
                    </div>
                    <div id="TextoRegistro_PantallaRegistro">
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
                            <input type={mostrarPassword2 ? "text" : "password"} placeholder="Repeat password" onChange={(e:any)=>{setPassword2(e.target.value)}} value={Password2} required/> 
                            <button onClick={()=>{setMostrarPassword2(!mostrarPassword2);}}><img src={mostrarPassword2 ? "https://image.shutterstock.com/image-vector/icon-line-password-show-design-600w-1757433218.jpg" : "https://image.shutterstock.com/image-vector/no-eye-icon-avoid-contact-600w-1329018929.jpg"} /></button> 
                        </div>

                    </div>
                </div>

                {errorRegistro!=0 && <div id="ErroresRegistro_PantallaRegistro">
                    {errorRegistro==1 && <p>Ya existe este correo</p> }
                    {errorRegistro==2 && <p>No has rellenado algún dato</p> }
                    {errorRegistro==3 && <p>Formato de email incorrecto</p> }
                    {errorRegistro==4 && <p>La constraseña no coincide</p> }
                </div>}

                <div id="BotonInicio_PantallaRegistro">
                    <button onClick={()=>{ejecutarMutation()}}><p><b>REGISTRARSE UWU</b></p></button>
                </div>
            </div>
            
        </div>
        
    )
}

export default PantallaRegistro