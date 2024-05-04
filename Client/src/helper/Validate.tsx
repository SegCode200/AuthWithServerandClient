import toast from "react-hot-toast";
import { authenticate } from "./EndPointAPI";


// Functions for validate passown values
export async function passwordValidate(values:any){
    const errors = passwordVerify({}, values)
    return errors
}

// Functions for Username
export async function usernameValidate(values:any) {
    const error = usernameVerify({}, values)
    if(values.username){
        // check user exist or not
        const {status}:any = await authenticate(values.username)
        if(status !== 200){
            error.exist = toast.error(" Username does not exist .....!")
        }
    }
    return error;
}

// function for Reset Password
export async function resetPasswordValidation(values:any){
    const error = usernameVerify({}, values)
    if(values.password !== values.confirm_password ){
        error.exist = toast.error(" Password not match")
    }
    return error;
}

// Function for Validate register form
export  const  registerValidation=async(values:any)=>{
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
} 

// Function for Profie page 

export async function profileValidation(values:any){
    const errrors = emailVerify({}, values);
    return errrors;
}



    
// Validate username
function usernameVerify (error:any, values:any){
    if(!values.username){
        error.username = toast.error("Username Required....!")
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username....!")
    }
    return error

    }


// Validate Password 
function passwordVerify(errors:any, values:any){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        errors.password = toast.error("Password Required")

    }else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password")
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4")
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special characters")
    }
    return errors
}
// ****************************************************************

function emailVerify(errors: any, values:any) {
    if(!values.email){
        errors.email = toast.error("Email Required")
    } else if (values.email.includes(" ")){
        errors.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = toast.error("Invalid email Address")
    }
    return errors;
}


   
 
