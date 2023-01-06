import React from "react"

// components
import AuthImageUpload from "./AuthImageUpload";

export default function AuthImageUploadField({ Icon, name, user_avatar, set_user_avatar}){
    return (
        <div className="__formImageContainer">
            <AuthImageUpload
                name={name}
                Icon={Icon}
                user_avatar={user_avatar}
                set_user_avatar={set_user_avatar}
            />
        </div>
    )
}