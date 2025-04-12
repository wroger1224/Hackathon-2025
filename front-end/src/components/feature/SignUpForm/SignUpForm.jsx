import Form from '../../common/Form/Form';
import { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { createUser } from '../../../services/Firebase/firebaseService';
import { useNavigate } from 'react-router';

const SignUpForm = () => {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState('');
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
			setError('Passwords do not match.');
			return;
		}

		try {
			await createUser(email, password);
			resetForm();
			//navigate home
			navigate("/");
		}catch (error){
			switch(error.code){
				case 'auth/email-already-in-use':
					setError('The provided email is already in use by an existing user.');
					break;
				case 'auth/invalid-email':
					setError('The provided value for the email is invalid.');
					break;
				case 'auth/weak-password':
					setError('Your password must be at least six characters.');
					break;
				default:
					console.log(error);
			}
		}
	}

	function resetForm() {
		setFormFields({ email: "", password: "", confirmPassword: "" });
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
				error && <p className='text-red-600 text-center mt-2'>{ error }</p>
			}
		</Form>
	)
}

export default SignUpForm;