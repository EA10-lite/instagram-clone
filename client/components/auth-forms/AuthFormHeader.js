import React from 'react';
import Image from 'next/image';


export default function AuthFormHeader({ logo }){
    return (
        <div className="__formLogoContainer">
            <Image src={logo} alt='' height={40} width={150} />
        </div>
    )
}