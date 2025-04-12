import SignInForm from "../../../components/feature/SignInForm/SignInForm";
import SignUpForm from "../../../components/feature/SignUpForm/SignUpForm";

const Auth = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl w-full space-x-8 flex">
				<div className="flex-1">
					<SignInForm />
				</div>
				<div className="flex-1">
					<SignUpForm />
				</div>
			</div>
		</div>
	);
};

export default Auth;