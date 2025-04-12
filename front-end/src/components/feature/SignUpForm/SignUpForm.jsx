import Form from '../../common/Form/Form';
import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { createUser } from '../../../services/Firebase/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setSignUpError } from '../../../reducers/userSlice';
import { useNavigate } from 'react-router-dom';


const SignUpForm = () => {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const dispatch = useDispatch();
	const signUpError = useSelector((state) => state.user.signUpError);
	const navigate = useNavigate();
	const { 
		email, 
		password, 
		confirmPassword 
	} = formFields;
	

	function handleChange (event) {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]:value });
	}

	async function handleSubmit (event) {
		event.preventDefault();

		if(password !== confirmPassword) {
			dispatch(setSignUpError('Passwords do not match.'));
			return;
		}

		try {
			await createUser(email, password);
			resetForm();
			navigate("/");
		}catch (error){
			dispatch(setSignUpError(error.message));
		}
	}

	function resetForm() {
		setFormFields({ email: "", password: "", confirmPassword: "" });
		dispatch(setSignUpError(''));
	}

	return (
		<Form handleSubmit={ handleSubmit }>
			<h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
			<Input
				id='email'
				label='Email'
				name='email'
				onChange={ handleChange }
				required
				type='email'
				value={ email }
			/>

			<Input
				id='password'
				label="Password"
				name='password'
				onChange={ handleChange }
				required
				type='password'
				value={ password }
			/>

			<Input
				id='confirmPassword'
				label="Confirm Password"
				name='confirmPassword'
				onChange={ handleChange }
				type='password'
				value={ confirmPassword }
				required
			/>

			<Button type='submit' variant='primary'>Sign Up</Button>

			{
				signUpError && (
					<div className="mt-2 p-2 bg-red-100 border border-red-300 rounded">
						<p className="!text-black text-sm font-medium text-center">{ signUpError }</p>
					</div>
				)
			}
		</Form>
	)
}

export default SignUpForm;