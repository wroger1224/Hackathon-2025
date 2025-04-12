import SignInForm from "../../../components/feature/SignInForm/SignInForm";
import SignUpForm from "../../../components/feature/SignUpForm/SignUpForm";
import "../../../index.css";
import Header from "../../../Header";

const Auth = () => {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <div
        id="auth-container"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div id="sign-in-container" className="w-full">
          <SignInForm />
        </div>
        <div id="sign-up-container" className="w-full">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
};

export default Auth;
