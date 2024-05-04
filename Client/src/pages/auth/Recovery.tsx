import React from 'react'
import styles from "../../styles/Username.module.css"
import {Toaster} from "react-hot-toast"
import { useFormik } from 'formik'
import { passwordValidate } from '../../helper/Validate'

const Recovery = () => {
 
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
   validateOnBlur: false,
   validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  })
  return (
    <div>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}> 
            <div className=' flex-col items-center w-[100%] '>
              <h4 className='text-5xl font-bold text-center'>Recovery</h4>
              <h5 className='py-4 text-xl  text-center '> 
              Enter OTP to recover password 
              </h5>

            </div>

            <form className='py-20' >
              {/* Avatar Input */}
              <div className='profile flex justify-center py-4'>
                

              </div>
              {/* Input Username */}
              <div className="textbox flex flex-col items-center gap-6 ">
                <div className="input text-center">
                <span className='py-4 text-sm text-center text-gray-500'>
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input className={styles.textbox} type='text'  placeholder='OTP'/>
                </div>
              
                <button className={styles.btn} type='submit'>Recover</button>
              </div>

              {/*  */} 
              <div className="text-center py-4 text-gray-500">  
                <span>Can't get OTP<button className='text-red-500' >Resend</button></span>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Recovery
