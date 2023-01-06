import React from "react";

export default function AuthFormErrorMessage({ error, visible }){
    if(!error || !visible) return null
    
    return (
        <p className="__formErrorText"> { error } </p>
    )
}