import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
	const { currentUser, loading } = useSelector((state) => state.users);

	if(loading) return null;
	
	if(!currentUser){
		return <Navigate to="/auth" />
	}

	return <Outlet />
}

export default ProtectedRoute