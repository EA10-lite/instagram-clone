import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import toast from 'react-hot-toast';

// components
import { 
    AuthForm,
    AuthFormContainer,
    AuthFormErrorMessage, 
    AuthFormField, 
    AuthFormFooter, 
    AuthFormHeader,
    AuthFormSubmitButton,
    AuthImageUploadField
} from '../components/auth-forms';

// icons
import { AiOutlineUser } from 'react-icons/ai';
import { MdLockOpen, MdLockOutline, MdEmail, MdCameraAlt } from 'react-icons/md';

// images
import logo from '../assets/instagram.png';

// utilities
import authApi from '../api/auth';
import validation from '../utils/validation';
import upload from '../api/upload';

export default function Signup(){
    const router = useRouter();
    const [ visible, set_visible ] = useState(false);

    const change_visibility = ()=> {
        set_visible(!visible);
    }

    
    const { login } = useContext(AuthContext);

    const [ user_avatar, set_user_avatar ] = useState();
    const [ error, setError ] = useState();
    const [ loading, set_loading ] = useState(false);
    const handleSubmit = async (values) => {
        try {
            set_loading(true);
            if (!user_avatar) 
                throw new Error("Select An Image")

            const avatar = await upload.upload_avatar(user_avatar);

            const response = await authApi.register_user({ ...values, avatar: avatar.secure_url });
            login(response);

            router.push('/');
            toast.success(response.data.message);
            
        } catch (error) {
            toast.error("Registration failed.");
            if(error.response){
                const { data: { error : errorMessage }} = error.response; 
                setError(errorMessage);
            }
            error.message ? setError(error.message) : null;
        } finally {
            set_loading(false);
        }
    }

    return (
        <AuthFormContainer style={"__formContainer"}>
            <AuthForm
                handleSubmit={ values => handleSubmit(values) }
                initialValues={{ email:'', name: '', password: '', username: '' }}
                validation={validation.signup_validation}
            >
                <AuthFormHeader logo={logo} />
                
                { error && <AuthFormErrorMessage error={error} /> }

                <AuthImageUploadField 
                    name="avatar"
                    Icon={MdCameraAlt}
                    set_user_avatar={set_user_avatar}
                    user_avatar={user_avatar}
                />
                
                <AuthFormField 
                    Icon={MdEmail}
                    name="name"
                    placeholder="Enter your Name"
                    type="text"
                />
                <AuthFormField 
                    Icon={AiOutlineUser}
                    name="username"
                    placeholder="Choose your unique Username"
                    type="text"
                />
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
                <AuthFormSubmitButton title="Signup" loading={loading} />
                <AuthFormFooter 
                    url="/login"
                    text="Already have an Account?"
                    placeholder="Login"
                />
            </AuthForm>
        </AuthFormContainer>
    )
}
