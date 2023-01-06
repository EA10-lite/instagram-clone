import React from 'react';

// components
import AuthFormLink from './AuthFormLink';


export default function AuthFormFooter({ url, placeholder, text}){
    return (
        <div className="__formText"> 
            <span> { text } </span>
            <AuthFormLink url={url} placeholder={placeholder} />
        </div>
    )
}