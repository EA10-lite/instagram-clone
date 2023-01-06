import React from 'react';
import { useFormikContext } from 'formik';

// components
import AuthErrorMessage from './AuthFieldError';
import AuthFormInput from './AuthFormInput';

export default function AuthFormField({ change_visibility, Icon, name, placeholder, type }){
    const { errors, handleChange, touched, values} = useFormikContext()
    return (
        <div className="__formField">
            <AuthFormInput 
                handleChange={handleChange}
                change_visibility={change_visibility}
                Icon={Icon}
                name={name}
                placeholder={placeholder}
                type={type}
                value={values[name]}
            />
            <AuthErrorMessage error={errors[name]} visible={touched[name]} />
        </div>
    )
}