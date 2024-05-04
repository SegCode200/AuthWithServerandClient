import React, { useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import avatar from "../../assets/profile.png"
import styles from "../../styles/Username.module.css"
import {Toaster} from "react-hot-toast"
import { useFormik } from 'formik'
import { usernameValidate } from '../../helper/Validate'
import { useAuthStore } from '../../utils/store'


const Username = () => {
 
  const navigate = useNavigate()
const setUsername:any = useAuthStore((state:any)=> state.setUsername )
const username = useAuthStore((state:any) => state.auth.username)

useEffect(()=>{

})
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
   validateOnBlur: false,
   validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values)
      setUsername(values.username)
      navigate("/password")
    },
  })
  return (
    <div>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}> 
            <div className=' flex-col items-center w-[100%] '>
              <h4 className='text-5xl font-bold text-center'>Hello Again</h4>
              <h5 className='py-4 text-xl  text-center '> 
              Exploring More by connecting with us. 
              </h5>

            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              {/* Avatar Input */}
              <div className='profile flex justify-center py-4'>
                <img src={avatar} alt="avatar" className={styles.profile_img} />

              </div>
              {/* Input Username */}
              <div className="textbox flex flex-col items-center gap-6 ">
                <input className={styles.textbox} type='text' {...formik.getFieldProps("username")} placeholder='Username'/>
                <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              {/*  */} 
              <div className="text-center py-4 text-gray-500">  
                <span>Not am Member<Link className='text-red-500' to='/register'>Register Now</Link></span>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Username
