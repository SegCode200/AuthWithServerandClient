import React from 'react'
import styles from "../../styles/Username.module.css"
import {Toaster} from "react-hot-toast"
import { useFormik } from 'formik'
import {  resetPasswordValidation } from '../../helper/Validate'

const Reset = () => {
 
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: ""
    },
    validate: resetPasswordValidation,
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
          <div className={styles.glass} style={{width: "50%"}}> 
            <div className=' flex-col items-center w-[100%] '>
              <h4 className='text-5xl font-bold text-center'>Reset</h4>
              <h5 className='py-4 text-xl  text-center '> 
              Enter new Password.
              </h5>

            </div>

            <form className='py-20' onSubmit={formik.handleSubmit}>
           
              {/* New  Password */}
              <div className="textbox flex flex-col items-center gap-6 ">
                <input className={styles.textbox} type='password' {...formik.getFieldProps("password")} placeholder='New Password'/>
              {/* Repeat Password */}
                <input className={styles.textbox} type='password' {...formik.getFieldProps("confirm_password")} placeholder='Repeat Password'/>
                <button className={styles.btn} type='submit'>Reset</button>
              </div>

             

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Reset
