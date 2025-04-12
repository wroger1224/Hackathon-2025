import Form from "../../common/Form/Form";
import Input from "../../common/Input/Input";
import { signInWithGooglePopup } from "../../../services/Firebase/firebaseService";
import { signInWithEmailPassword } from "../../../services/Firebase/firebaseService";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../common/Button/Button";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../reducers/userSlice";


const defaultFormFields = {
	email: "",
	password: ""
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { 
		email, 
		password 
	} = formFields;
	const dispatch = useDispatch();

	function handleChange (event) {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]:value });
	}

	async function handleSubmit (event) {
		event.preventDefault();

		try {
			const {user} = await signInWithEmailPassword(email, password);
			dispatch(setCurrentUser(user));
			resetForm();
			navigate("/");
		}catch(error){
			switch(error.code){
				case 'auth/invalid-credential':
					setError('Incorrect Username or Password');
					break;
				case 'auth/too-many-requests':
					setError('Access to this account has been temporarily disabled due to many failed login attempts');
					break;
				default:
					console.log(error);
			}
		}
	}

	function resetForm() {
		setFormFields({ email: "", password: "" });
		setError('');
	}

	async function signInWithGoogle() {
		try {
			const {user} = await signInWithGooglePopup();
			dispatch(setCurrentUser(user));
			resetForm();
			navigate("/");
		}catch(error){
			console.log(error);
		}
	}

	return (
			<Form handleSubmit={ handleSubmit }>
				<h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
				<div className="flex flex-col">
					<Input
						label = "Email"
						type="email" 
						required 
						onChange={handleChange} 
						name="email" 
						value={email}
					/>
				</div>

				<div className="flex flex-col">
					<Input 
						label = "Password"
						type="password" 
						required 
						onChange={handleChange} 
						name="password" 
						value={password}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Button type="submit" variant = 'primary'>Sign In</Button>
					<Button type="button" onClick={signInWithGoogle} variant="secondary">Google Sign In</Button>		
				</div>
				{
					error && <p className='text-red-600 text-center mt-2'>{ error }</p>
				}
			</Form>
	)
}

export default SignInForm;