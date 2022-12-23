import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const navigation = useNavigate()

	const initialValue = {
		userName: "",
		password: "",
	}

	const validateSchema = Yup.object().shape({
		userName: Yup.string().min(3).max(15).required(),
		password: Yup.string().min(3).max(15).required(),
	})

	const onSubmit = (data) => {
		axios.post("http://localhost:3001/auth/user/register", data).then((response)=>{
			navigation("/login");
      alert("Registration Success!!");
		})
	}

  return (
    <div style={{fontSize:"18px"}}> Register
    <div className="createPostPage"> 
      <Formik initialValues={initialValue} validationSchema={validateSchema} onSubmit={onSubmit}>
        <Form className="formContainer"  style={{marginTop:"-170px"}}>
          <label for="">User</label>
          <ErrorMessage name="userName" component="span" />
          <Field autocomplete="off" id="inputCreatePost" name="userName" placeholder="Ex. User" />
    
          <label for="">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field type="password" name="password" autocomplete="off" id="inputCreatePost" placeholder="Ex. Password" />
    
          <button type="submit"> Register </button>
        </Form>
      </Formik>
    </div>
    </div>
  )
}

export default Register