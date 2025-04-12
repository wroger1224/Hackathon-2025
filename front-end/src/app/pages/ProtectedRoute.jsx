import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from '../../services/userProfile/userProfile';

const ProtectedRoute = () => {
	const {user, loading} = useSelector((state) => state.user);

	if (loading) return null;
	
	if (!user) {
		console.log('No user, redirecting to /auth');
		return <Navigate to="/auth" />;
	}

	// Allow access to protected route
	console.log('Access granted to protected route');
	return <Outlet />;
};

export default ProtectedRoute