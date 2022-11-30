import React, { FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './PantallaCheckCode.css'
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client"

const AbleAccount = gql`
      mutation AbleAccount($id:String!,$code:String!){
        AbleAccount(id:$id,code:$code)
}
`

const PantallaCheckCode: FC<{}> =()=>{

    //Navigate usado para navegar a una páguina cuando no quieres usar un Link
    const navigate= useNavigate()
    const [errorAble,setErrorAble]=useState<number>(0)

    //UseStates
    const [Code1,setCode1]= useState<string>("")
    const [Code2,setCode2]= useState<string>("")
    const [Code3,setCode3]= useState<string>("")
    const [Code4,setCode4]= useState<string>("")
    const [Code5,setCode5]= useState<string>("")
    const [Code6,setCode6]= useState<string>("")

    const [Code,setCode]= useState<string>("")

    useEffect(()=>{
        setCode(Code1+Code2+Code3+Code4+Code5+Code6);
    },[Code1,Code2,Code3,Code4,Code5,Code6])
    

    const [AbleAccountMutacion] = useMutation(AbleAccount, { 
        variables: {id:window.location.href.split("/")[4], code:Code}
    })

    //Función que llama a la mutation LogIn
    async function ejecutarMutationAble(){
        const Able=await AbleAccountMutacion()
        if(Able.data.AbleAccount==0){
            navigate("/login")
        }else{
            setErrorAble(Able.data.AbleAccount)
            console.log(errorAble)
            setTimeout(()=>{setErrorAble(0)},3000)
        }
    }

    return(
        <div id="PantallaPantallaCheckCode">
            <div id="PedirDatos_PantallaCheckCode">
                <div id="ParteArriba_PantallaCheckCode">
                    <div id="BotonAtras_PantallaCheckCode">
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}><p>←</p></Link>
                    </div>
                    <div id="TextoInicioSesion_PantallaCheckCode">
                            <p><b>Código de verificación</b></p>
                    </div>
                </div>
                <div id="ParteDatos_PantallaCheckCode">
                    <div id="Inputs_PantallaCheckCode">
                        <div id="TextoInput_PantallaCheckCode">
                            <p>Introduce tu codigo de verificación</p>
                        </div>
                        <div id="InputsCaracter_PantallaCheckCode">
                            <input id="1" type="text" onChange={(e:any)=>{setCode1(e.target.value)}} onKeyUp={()=>{document.getElementById("2")?.focus()}} maxLength={1} required/> 
                            <input id="2" type="text" onChange={(e:any)=>{setCode2(e.target.value)}} onKeyUp={()=>{document.getElementById("3")?.focus()}} maxLength={1} required/> 
                            <input id="3" type="text" onChange={(e:any)=>{setCode3(e.target.value)}} onKeyUp={()=>{document.getElementById("4")?.focus()}} maxLength={1} required/> 
                            <input id="4" type="text" onChange={(e:any)=>{setCode4(e.target.value)}} onKeyUp={()=>{document.getElementById("5")?.focus()}} maxLength={1} required/> 
                            <input id="5" type="text" onChange={(e:any)=>{setCode5(e.target.value)}} onKeyUp={()=>{document.getElementById("6")?.focus()}} maxLength={1} required/> 
                            <input id="6" type="text" onChange={(e:any)=>{setCode6(e.target.value)}} onKeyUp={()=>{document.getElementById("1")?.focus()}} maxLength={1} required/> 
                        </div>
                        
                    </div>
                    <div id="BotonInicio_PantallaCheckCode">
                        <button onClick={()=>{ejecutarMutationAble()}}><p><b>Introducir Codigo</b></p></button>
                    </div>
                </div>
                {errorAble!=0 && <div id="ParteErrores">
                    {errorAble==1 && <p>No existe este ID</p>}
                    {errorAble==2 && <p>Ya está habilitada</p>}
                    {errorAble==3 && <p>El codigo no es correcto</p>}
                </div>}
            </div>
            
        </div>
        
    )
}

export default PantallaCheckCode