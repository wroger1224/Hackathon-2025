
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import './index.css'

const Home = () => {
	const { currentUser } = useContext(UserContext);
	
	return (
		<h1>Home</h1>
	)
}

export default Home