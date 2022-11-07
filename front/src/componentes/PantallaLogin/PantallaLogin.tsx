import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './PantallaLogin.css'

const PantallaLogin: FC<{}> =()=>{

    return(
        <div id="PantallaLogin">
            <Link to="/"><p>Volver atras</p></Link>
        </div>
        
    )
}

export default PantallaLogin