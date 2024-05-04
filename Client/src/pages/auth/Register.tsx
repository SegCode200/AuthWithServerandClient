import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../../assets/profile.png"
import styles from "../../styles/Username.module.css"
import toast, {Toaster} from "react-hot-toast"
import { useFormik } from 'formik'
import { registerValidation } from '../../helper/Validate'
import convertToBase64 from '../../helper/convert'
import { registerUser } from '../../helper/EndPointAPI'

const Register = () => {

   const navigate = useNavigate()
 const [file, setFile] = useState<any>()
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
   validateOnBlur: false,
   validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {profile: file || ""})
      let registerpromise = registerUser(values)
      
      toast.promise(registerpromise,{
        loading: 'Registering...',
        success: <b>Registered Successfully....!</b>,
        error: <b>Could not Register.</b>
      });
      registerpromise.then(function(){
        navigate("/")
      }) 
    },
  })

  // Formik doesn't support file upload so we need to
  const onUpload = async (e:any)=>{
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  return (
    <div>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass} style={{width: "45%"}}> 
            <div className='flex-col items-center w-full '>
              <h4 className='text-5xl font-bold text-center'>Register</h4>
              <h5 className='py-4 text-xl  text-center '> 
              Happy to join you! 
              </h5>

            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              {/* Avatar Input */}
              <div className='flex justify-center py-4'>
                <label htmlFor='profile'>
                <img src={file || avatar} alt="avatar" className={styles.profile_img} />
                </label>
                <input onChange={onUpload} type="file" id='profile' name='profile' />

              </div>
              {/* Input Username */}
              <div className="textbox flex flex-col items-center gap-6 ">
                <input className={styles.textbox} type='text' {...formik.getFieldProps("email")} placeholder='Email'/>
                <input className={styles.textbox} type='text' {...formik.getFieldProps("username")} placeholder='Username'/>
                <input className={styles.textbox} type='password' {...formik.getFieldProps("password")} placeholder='Password'/>
                <button className={styles.btn} type='submit'>Register</button>
              </div>

              {/*  */} 
              <div className="text-center py-4 text-gray-500">  
                <span>Already Register?<Link className='text-red-500' to='/'>Login Now</Link></span>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Register
