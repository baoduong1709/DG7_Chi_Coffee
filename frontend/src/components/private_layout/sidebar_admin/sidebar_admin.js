import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SideBarAdmin() {
    const [userData, setUserData] = useState("");
    useEffect(()=>{
        setUserData(() => JSON.parse(localStorage.getItem("user")))
    },[])

    return(
        <>
            <h1>Xin chào {userData?.name}</h1>
        </>
    );
}