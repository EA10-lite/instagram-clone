import React from 'react';
import { useFormikContext } from 'formik';

export default function AuthFormSubmitButton({ loading, title }){
    const { handleSubmit } = useFormikContext();
    return (
        <button 
            className="__formSubmitButton"
            onClick={handleSubmit}
            type="button" 
            disabled={loading}
        > { loading ? "submitting..." : title } </button> 
    )
}