import React from 'react';

export default function AuthFormInput({ 
    change_visibility, 
    handleChange, 
    Icon, 
    name, 
    placeholder, 
    type, 
    value 
}){
    return (
        <div className="__formInputContainer">
            { Icon && <Icon 
                className="__formIcon" 
                color={"#555"}
                onClick={change_visibility}
                size={20} 
            /> }
            <input 
                className="__formInput"
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value} 
            />
        </div>
    )
}
