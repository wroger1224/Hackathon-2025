import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateUserProfileMutation } from '../../../services/userProfile/userProfile';
import Form from '../../../components/common/Form/Form';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

const CreateProfile = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	console.log(user);
	const [createUserProfile, { isLoading }] = useCreateUserProfileMutation();

	const [profile, setProfile] = useState({
		email: "",
		firstName: "",
		lastName: "", 
		age: "", 
		weight: "", 
		activityLevel: "", 
		heightInInches: "",
	});
	
	const handleChange = (event) => {
		const { name, value } = event.target;
		setProfile({ ...profile, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		try {
			await createUserProfile({
				uid: user.uid,
				...profile
			}).unwrap();
			
			// Navigate to home page after successful profile creation
			navigate('/');
		} catch (error) {
			console.error('Failed to create profile:', error);
			// Handle error (show error message to user)
		}
	};

	return (
		<Form handleSubmit={ handleSubmit }>
			<div className="flex flex-col gap-4">
				<Input
					label="First Name"
					name="firstName"
					value={profile.firstName}
					onChange={handleChange}
					required
				/>
				<Input
					label="Last Name"
					name="lastName"
					value={profile.lastName}
					onChange={handleChange}
					required
				/>
				<Input
					label="Email"
					name="email"
					value={profile.email}
					onChange={handleChange}
					required
				/>
				<Input
					label="Age"
					name="age"
					type="number"
					value={profile.age}
					onChange={handleChange}
					min="0"
					required
				/>	
				<Input
					label="Weight (lbs)"
					name="weight"
					type="number"
					value={profile.weight}
					onChange={handleChange}
					min="0"
					required
				/>	
				<Input
					label="Height (inches)"
					name="heightInInches"
					type="number"
					value={profile.heightInInches}
					onChange={handleChange}
					min="0"
					required
				/>		

				<div className='flex flex-col space-y-1'>
					<label htmlFor="activityLevel" className='text-sm font-medium text-gray-700'>Activity Level</label>
					<select 
						name="activityLevel" 
						id="activityLevel" 
						onChange={handleChange}
						className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
						value={profile.activityLevel}
					>
						<option value="">Select an activity level</option>
						<option value="sedentary">Sedentary</option>
						<option value="moderatelyActive">Moderately Active</option>
						<option value="veryActive">Very Active</option>
					</select>
				</div>

				<Button 
					type="submit" 
					variant="primary"
					disabled={isLoading}
				>
					{isLoading ? 'Creating...' : 'Submit'}
				</Button>
			</div>
		</Form>
	);
};

export default CreateProfile;
