import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from "../../assets/profile.png"
import styles from "../../styles/Username.module.css"
import extend from "../../styles/Profile.module.css"
import toast, {Toaster} from "react-hot-toast"
import { useFormik } from 'formik'
import { profileValidation } from '../../helper/Validate'
import convertToBase64 from '../../helper/convert'
import { useFetch } from '../../hooks/fetchHooks'
import { useAuthStore } from '../../utils/store'
import { updateUser } from '../../helper/EndPointAPI'

const Profile = () => {
  

  const {username} = useAuthStore((state:any) =>state.auth)
  const [ {isLoading, apiData, serverError}]:any  = useFetch(`user/${username} `)
 
  
 const [file, setFile] = useState<any>()
  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname:apiData?.lastname ||  "",
      email: apiData?.email || "",
      mobile: apiData?.mobile ||  "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
   validateOnBlur: false,
   validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || "" })
      let updatePromise = updateUser(values)
      toast.promise(updatePromise, {
        loading: "Updating.....",
        success: <b>Update Sucessful....!</b>,
        error: <b>could not update!</b>
      })

    },
  })

  // Formik doesn't support file upload so we need to
  const onUpload = async (e:any)=>{
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }
  
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-2xl text-red-500'>{serverError.message}</h1>

  return (
    <div>
      <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-screen'>
          <div className={`${styles.glass} ${extend.glass}`} style={{width: "45%"}}> 
            <div className='flex-col items-center w-full '>
              <h4 className='text-5xl font-bold text-center'>Profile</h4>
              <h5 className='py-4 text-xl  text-center '> 
              You can update your profile
              </h5>

            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
              {/* Avatar Input */}
              <div className='flex justify-center py-4'>
                <label htmlFor='profile'>
                <img src={apiData?.profile || file || avatar } alt="avatar" className={`${styles.profile_img} ${extend.profile_img}`} />
                </label>
                <input onChange={onUpload} type="file" id='profile' name='profile' />

              </div>
              {/* Holder for Input */}
              <div className="textbox flex flex-col items-center gap-6 "> 
              
              {/* First Flex Line */}
                <div className="flex w-3/4 gap-10">
                    {/* Input FirstName */}
                <input className={`${styles.textbox} ${extend.glass}`} type='text' {...formik.getFieldProps("firstname")} placeholder='FirstName'/>
                  {/* Input LastName */}
                <input className={`${styles.textbox} ${extend.glass}`} type='text' {...formik.getFieldProps("lastname")} placeholder='LastName'/>
                </div>

                  {/* Second Flex Line */}
                <div className="flex w-3/4 gap-10">
                    {/* Input Mobile Number */}
                <input className={`${styles.textbox} ${extend.glass}`} type='text' {...formik.getFieldProps("email")} placeholder='Email'/>
                  
                 {/* Input Email */}
                 <input className={`${styles.textbox} ${extend.glass}`} type='text' {...formik.getFieldProps("mobile")} placeholder='Mobile No.'/>

                </div>

             
              
                {/* Input Address */}
                <input className={`${styles.textbox} ${extend.glass}`} type='text' {...formik.getFieldProps("address")} placeholder='Address'/>

                
                <button className={styles.btn} type='submit'>Update</button>
                
              </div>

              {/*  */} 
              <div className="text-center py-4 text-gray-500">  
                <span>Come back Later?<Link className='text-red-500' to='/'>Login Out</Link></span>
              </div>

            </form>

          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Profile
