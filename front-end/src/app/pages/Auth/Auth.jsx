import SignInForm from "../../../components/feature/SignInForm/SignInForm";
import SignUpForm from "../../../components/feature/SignUpForm/SignUpForm";

const Auth = () => {
	return (
		<main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="w-full">
					<SignInForm />
				</div>
				<div className="w-full">
					<SignUpForm />
				</div>
			</div>
		</main>
	);
};

export default Auth;