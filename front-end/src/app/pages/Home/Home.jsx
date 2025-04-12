import { useSelector } from "react-redux";
const Home = () => {
	const { currentUser } = useSelector((state) => state.users);
	
	return (
		<h1>Home</h1>
	)
}

export default Home