import * as Yup from 'yup';

const email = Yup.string().email().label().required();
const password = Yup.string().label('Password').required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 characters, One Uppercase, One Lowercase, One Number and one special case character"
);

const signup_validation = Yup.object().shape({
    email,
    password,
    name: Yup.string().min(5).max(50).label('Name').required(),
    username: Yup.string().min(3).max(50).label('Username').required()
});

const login_validation = Yup.object().shape({
    name: Yup.string().required(),
    password
});

const reset_password = Yup.object().shape({
    email,
    password,
    confirm_password: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default {
    login_validation,
    reset_password,
    signup_validation,
}