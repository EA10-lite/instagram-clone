import React, { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// components
import { 
    AuthForm, 
    AuthFormContainer,
    AuthFormErrorMessage,
    AuthFormField, 
    AuthFormHeader,
    AuthFormLink,
    AuthFormSubmitButton,
} from '../components/auth-forms';

// icons
import { MdLockOpen, MdLockOutline, MdEmail } from 'react-icons/md';

// images
import logo from '../assets/instagram.png';


// utilities
import validation from '../utils/validation';
import authApi from '../api/auth';


export default function ResetPassword(){
    const router = useRouter()
    const [ visible, set_visible ] = useState(false);
    const change_visibility = ()=> {
        set_visible(!visible);
    }

    const [ error, setError ] = useState();
    const handleSubmit = async (values)=> {
        try {
            const response = await authApi.reset_user_password(values);
            toast.success(response.data.message);
            router.push('/login');
        } catch (error) {
            toast.error("Failed To reset Password");
            const { response: { data: { error: errorMessage }}} = error;
            errorMessage ? setError(errorMessage) :  null ;
        }
    };

    return (
        <AuthFormContainer style={"__formContainer"}>
            <AuthForm
                handleSubmit={ values => handleSubmit(values) }
                initialValues={{ email:'', password: '', confirm_password: ''}}
                validation={validation.reset_password}
            >
                <AuthFormHeader logo={logo} />

                { error && <AuthFormErrorMessage error={error} /> }
                <AuthFormField 
                    Icon={MdEmail}
                    name="email"
                    placeholder="Enter your email address"
                    type="text"
                />
                <AuthFormField 
                    change_visibility={change_visibility}
                    Icon={ visible ? MdLockOpen : MdLockOutline }
                    name="password"
                    placeholder="Enter your password"
                    type={ visible ? "text" : "password" }
                />
                <AuthFormField 
                    change_visibility={change_visibility}
                    Icon={ visible ? MdLockOpen : MdLockOutline }
                    name="confirm_password"
                    placeholder="Retype password"
                    type={ visible ? "text" : "password" }
                />
                <AuthFormSubmitButton title="Reset Password" />
                <AuthFormLink 
                    url={"/login"} 
                    placeholder="Back to Login" 
                    style="__space" 
                />
            </AuthForm>
        </AuthFormContainer>
    )
}
