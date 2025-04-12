import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
	const {user, loading } = useSelector((state) => state.user);
	const { profile, isLoading } = useSelector((state) => state.userProfile);
	console.log(profile);
	
	if (loading || isLoading) {
		return <div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	}

	if (!user) {
		console.log('No user, redirecting to /auth');
		return <Navigate to="/auth" />;
	}

	if(!profile) {
		console.log('No profile, redirecting to /create-profile');
		return <Navigate to="/create-profile" />;
	}

	// Allow access to protected route
	console.log('Access granted to protected route');
	return <Outlet />;
};

export default ProtectedRoute