import Form from "../../common/Form/Form";
import Input from "../../common/Input/Input";
import { signInWithGooglePopup } from "../../../services/Firebase/firebaseService";
import { signInWithEmailPassword } from "../../../services/Firebase/firebaseService";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setSignInError } from "../../../reducers/userSlice";

const defaultFormFields = {
	email: "",
	password: ""
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const navigate = useNavigate();
	const { 
		email, 
		password 
	} = formFields;
	const dispatch = useDispatch();
	const { signInError } = useSelector((state) => state.user);

	function handleChange (event) {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]:value });
	}

	async function handleSubmit (event) {
		event.preventDefault();

		try {
			const user = await signInWithEmailPassword(email, password);
			dispatch(setUser(user));
			resetForm();
			navigate("/");
		}catch(error){
			dispatch(setSignInError(error.message));
		}
	}

	function resetForm() {
		setFormFields({ email: "", password: "" });
		dispatch(setSignInError(''));
	}

	async function signInWithGoogle() {
		try {
			const {user} = await signInWithGooglePopup();
			dispatch(setUser(user));
			resetForm();
			navigate("/");
		}catch(error){
			dispatch(setSignInError(error.message));
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
					signInError && <p className='text-red-600 text-center mt-2'>{ signInError }</p>
				}
			</Form>
	)
}

export default SignInForm;