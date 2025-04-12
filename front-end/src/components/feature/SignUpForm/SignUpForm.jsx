import Form from '../../common/Form/Form';
import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { createUser } from '../../../services/Firebase/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setSignUpError } from '../../../reducers/userSlice';


const SignUpForm = () => {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const dispatch = useDispatch();
	const { signUpError } = useSelector((state) => state.user);	
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
				signUpError && <p className='text-red-600 text-center mt-2'>{ signUpError }</p>
			}
		</Form>
	)
}

export default SignUpForm;