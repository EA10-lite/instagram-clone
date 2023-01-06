import React from "react";
import { Formik } from "formik";


export default function AuthForm({ children, handleSubmit, initialValues, validation }){
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validation}
        >
            {()=> (
                <form className="__form">
                    { children }
                </form>
            )}
        </Formik>
    )
}