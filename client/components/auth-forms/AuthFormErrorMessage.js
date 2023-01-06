import React from "react";

export default function AuthFormErrorMessage({ error }){
    if(!error) return null;
    
    return (
        <p className="__formErrorText __space"> { error } </p>
    )
}