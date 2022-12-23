import React, {useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'

const Create = () => {
	const navigation = useNavigate();

	const initialValue = {
		title: "",
		postText: "",
	}

	useEffect(() => {
		if(!localStorage.getItem('accessToken')){
			navigation('/login')
		}
	},[])

	const validateSchema = Yup.object().shape({
		title: Yup.string().required("You must input a Title!"),
		postText: Yup.string().required(),
	})

	const onSubmit = (data) => {
		axios.post("http://localhost:3001/posts/post", data, {
			headers:{
				accessToken : localStorage.getItem('accessToken')
			}
		}).then((response)=>{
			navigation("/")
		})
	}

  return (
	<div style={{fontSize: '18px'}}> Create a Post
		<div className="createPostPage">
			<Formik initialValues={initialValue} validationSchema={validateSchema} onSubmit={onSubmit}>
				<Form className="formContainer" style={{marginTop:"-170px"}}>
					<label for="">Title</label>
					<ErrorMessage name="title" component="span" />
					<Field autocomplete="off" id="inputCreatePost" name="title" placeholder="Ex. Title" />

					<label for="">Post Text</label>
					<ErrorMessage name="postText" component="span" />
					<Field name="postText" autocomplete="off" id="inputCreatePost" placeholder="Ex. Post Text" />

					<button type="submit"> Create Post</button>
				</Form>
			</Formik>
		</div>
	</div>
  )
}

export default Create