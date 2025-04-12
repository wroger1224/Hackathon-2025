import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../../../components/common/Form/Form';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { createUserProfile } from '../../../reducers/userProfileSlice';
import { useNavigate } from 'react-router-dom';
const CreateProfile = () => {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const { isLoading } = useSelector((state) => state.userProfile);
	const dispatch = useDispatch();

	const [profile, setProfile] = useState({
		email: user?.email || "",
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
			await dispatch(createUserProfile(profile)).unwrap();
			navigate('/');
		} catch (error) {
			console.error('Error updating profile:', error);
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
						id="activityLevel"
						name="activityLevel"
						value={profile.activityLevel}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					>
						<option value="">Select an activity level</option>
						<option value="sedentary">Sedentary</option>
						<option value="moderatelyActive">Moderately Active</option>
						<option value="veryActive">Very Active</option>
					</select>
				</div>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? 'Creating Profile...' : 'Create Profile'}
				</Button>
			</div>
		</Form>
	);
};

export default CreateProfile;
