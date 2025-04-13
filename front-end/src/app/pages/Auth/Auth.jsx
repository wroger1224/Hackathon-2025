import SignInForm from "../../../components/feature/SignInForm/SignInForm";
import SignUpForm from "../../../components/feature/SignUpForm/SignUpForm";
import "../../../index.css";

const Auth = () => {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <img
          id="auth-logo"
          src="assets/3-Logo-Color.png"
          alt="Logo"
          className="w-32 sm:w-48 mb-8"
        />
        <div
          id="auth-container"
          className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div
            id="sign-in-container"
            className="w-full lg:max-w-[580px] lg:justify-self-end rounded-2xl shadow-lg p-4 sm:p-6"
          >
            <SignInForm />
          </div>
          <div
            id="sign-up-container"
            className="w-full lg:max-w-[580px] lg:justify-self-start rounded-2xl shadow-lg p-4 sm:p-6"
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
