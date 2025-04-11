import { Outlet } from "react-router"

const Layout = () => {
	return(
		<>
			<h1> This will be header </h1>
			<Outlet />
		</>
		
	)
}

export default Layout