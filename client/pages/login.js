import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth';

// components
import { 
    AuthForm, 
    AuthFormContainer,
    AuthFormErrorMessage,
    AuthFormField, 
    AuthFormFooter, 
    AuthFormHeader,
    AuthFormLink,
    AuthFormSubmitButton,
} from '../components/auth-forms';

// icons
import { MdLockOpen, MdLockOutline, MdEmail } from 'react-icons/md';

// images
import logo from '../assets/instagram.png';


// utilities
import auth_api from '../api/auth';
import user_api from '../api/user';
import validation from '../utils/validation';


export default function Login(){
    const router = useRouter();

    const [ visible, set_visible ] = useState(false);
    const change_visibility = ()=> {
        set_visible(!visible);
    }

    const { login } = useContext(AuthContext);

    const [ error, set_error ] = useState();
    const [ loading, set_loading ] = useState(false);
    const handle_submit = async (values) => {
        set_loading(true);
        try {
            const response = await auth_api.login_user(values);
            await login(response, user_api.get_user);
            await router.push("/");
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Login Failed');
            const { response: { data: { error: errorMessage }} } = error;
            errorMessage ? set_error(errorMessage) : null;
        } finally {
            set_loading(false);
        }
    };

    return (
        <AuthFormContainer style={"__formContainer"}>
            <AuthForm
                handleSubmit={ values => handle_submit(values) }
                initialValues={{ name:'', password: '' }}
                validation={validation.login_validation}
            >
                <AuthFormHeader logo={logo} />

                { error && <AuthFormErrorMessage error={error} /> }
                <AuthFormField 
                    Icon={MdEmail}
                    name="name"
                    placeholder="Enter your email address or username"
                    type="text"
                />
                <AuthFormField 
                    change_visibility={change_visibility}
                    Icon={ visible ? MdLockOpen : MdLockOutline }
                    name="password"
                    placeholder="Enter your password"
                    type={ visible ? "text" : "password" }
                />
                <AuthFormSubmitButton title="Login" loading={loading} />
                <AuthFormFooter 
                    url="/signup"
                    text="Dont have an account?"
                    placeholder="Sign up"
                />
                <AuthFormLink url={"/reset-password"} placeholder="Forget Password" style="__space" />
            </AuthForm>
        </AuthFormContainer>
    )
}
