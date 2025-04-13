import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
	const {user, loading } = useSelector((state) => state.user);
	const { profile, isLoading } = useSelector((state) => state.userProfile);
	
	if (loading || isLoading) {
		return <div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	}

	if (!user) {
		return <Navigate to="/auth" />;
	}

	if(!profile) {
		return <Navigate to="/create-profile" />;
	}

	return <Outlet />;
};

export default ProtectedRoute