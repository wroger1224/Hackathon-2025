import { Navigate, Outlet } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const ProtectedRoute = () => {
	const { currentUser, loading } = useContext(UserContext);

	if(loading) return null;
	
	if(!currentUser){
		return <Navigate to="/auth" />
	}

	return <Outlet />
}

export default ProtectedRoute