import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({
	authenticated = true,
}) => {
	//redux or context?
	if(!authenticated){
		return <Navigate to="/auth" />
	}

	return <Outlet />
}

export default ProtectedRoute