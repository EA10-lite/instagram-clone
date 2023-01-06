import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function AuthImageUpload({ Icon, user_avatar, set_user_avatar }){
    const [ preview, set_preview ] = useState();
    const [ error, set_error ] = useState();

    const selectImage = (e) => {
        const file = e.target.files[0];
        if(file.size > 10000000)
            set_error("file size too large")
        else {
            set_error(null);
            set_user_avatar(file);
        }
    }

    useEffect(()=>{
        if(user_avatar){
            const reader = new FileReader();
            reader.onloadend = ()=> {
                set_preview(reader.result);
            }
            reader.readAsDataURL(user_avatar);
        } else {
            set_preview(preview);
        }
    },[user_avatar]);

    return (
        <label className={`__formImageUploadContainer ${ error && "__formImageUploadError"}`}>
            <input 
                type="file" 
                accept="image/*" 
                multiple={false}
                onChange={(e)=> selectImage(e)} 
            />
            { !preview && <Icon size={28} color="#818188" /> }
            { preview && <div className="__avatar">
                <Image 
                    alt="" 
                    layout="fill" 
                    objectFit="cover" 
                    src={preview} 
                />
            </div>}
        </label> 
    )
}