import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = "http://localhost:2000"


// To get username from Token

export async function getUsername(){
    const token = localStorage.getItem("token")
    if(!token) return Promise.reject("Cannot find Token")
    const decode = jwt_decode(token)
    console.log(decode)
}
export const authenticate=async(username:any)=>{
    try {
        return await axios.post("/api/users/authenticate", {username})

    } catch (error) {
        return {error: "Username doesnot exist .....!"}
    }
}

export const getUser = async(username:any)=>{
    try {
        const {data} = await axios.get(`/api/users/user/${username}`)
    } catch (error) {
        return {error: "Password doesn't match!"}
    }
}
export const registerUser =async(credentials:any)=>{
    try {
       const {data: {msg},status, } = await axios.post(`/api/users/register`, credentials)
       let {username, email} = credentials

    //    Send Email
    if(status === 201){
        await axios.post("/api/users/registerMail", {username, userEmail:email, text: msg})
    }
     return Promise.resolve(msg)
    } catch (error) {
        
        return Promise.reject({error})
    }
}
// Login Function

export const VerifyPassword=async({username, password}:any)=>{
    try{
        if(username){
           const {data} = await axios.post("/api/users/login", {username, password})
           return Promise.resolve({data})
        }
    }catch(error){
        console.log(error)
        return Promise.reject({error: "Wrong Password"})
    }
}

// Update user function 
export const updateUser=async(response:any)=>{
    try {
       const token = await localStorage.getItem("token") 
       const data = await axios.put("/api/users/updateuser", response, {headers: {"Authorization": `Bearer ${token}`}})
       return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error: "Couldn't Update Profile"})
    }

}

// Generate OTP
export const generateOTP = async(username:any)=>{
    try {
       const {data: {code}, status} = await axios.get("/api/users/generatedOTP", {params: {username}})

    //    Send Mail with OTP
       if(status === 200){
       let {data: {email}}:any = await getUser({username})
       let text = `Your Password recovery OTP is ${code}`
       await axios.post("api/users/registerMail",{username, userEmail:email, text, subject: " Password Recovery OTP"})
       
       }
       return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}

// Verify OTP
export async function verifyOTP(username:any, code:any){
try {
    const {data, status} = await axios.get("/api/users/verifyOTP", {params: {username, code}})
    return {data, status}
} catch (error) {
 return Promise.reject({error})   
}
}

export async function resetPassword(username:any, password: any){
    try {
        const {data, status} = await axios.put("/api/users/resetPassword", {username, password})

        return Promise.resolve({data, status})
    } catch (error) {
        return Promise.reject({error})
    }
}
