import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../../assets/profile.png"
import styles from "../../styles/Username.module.css"
import toast, {Toaster} from "react-hot-toast"
import { useFetch } from '../../hooks/fetchHooks'
import { useFormik } from 'formik'
import { passwordValidate } from '../../helper/Validate'

import { useAuthStore } from '../../utils/store'
import { VerifyPassword } from '../../helper/EndPointAPI'

const Password = () => {
  const navigate = useNavigate()
  const {username} = useAuthStore((state:any) =>state.auth)
  // console.log(username)

  const [ {isLoading, apiData, serverError}]:any  = useFetch(`user/${username} `)

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
   validateOnBlur: false,
   validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values)
      let loginPromise = VerifyPassword({username, password: values.password})
      toast.promise(loginPromise, {
        loading: "checking.....!",
        success: <b>Login Sucessfully....!</b>,
        error: <b>Password not Match!</b>,

      })
      loginPromise.then((res) => {
        let {token} = res?.data
        localStorage.setItem('token', token)
        navigate("/profile")

      }).catch((error)=>{
        console.log(error)
        error.exist = toast.error(<b>Wrong Password</b>)
      })
    },
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-2xl text-red-500'>{serverError.message}</h1>
  return (
    <div>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}> 
            <div className=' flex-col items-center w-[100%] '>
              <h4 className='text-5xl font-bold text-center'>Hello {apiData?.firstName || apiData?.username }
              </h4>
              <h5 className='py-4 text-xl  text-center '> 
              Exploring More by connecting with us. 
              </h5>

            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              {/* Avatar Input */}
              <div className='profile flex justify-center py-4'>
                <img src={apiData?.profile || avatar} alt="avatar" className={styles.profile_img} />

              </div>
              {/* Input Username */}
              <div className="textbox flex flex-col items-center gap-6 ">
                <input className={styles.textbox} type='password' {...formik.getFieldProps("password")} placeholder='*********'/>
                <button className={styles.btn} type='submit'>Sign In</button>
              </div>

              {/*  */} 
              <div className="text-center py-4 text-gray-500">  
                <span>Not am Member<Link className='text-red-500' to='/recovery'>Forgot Paswword</Link></span>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Password
