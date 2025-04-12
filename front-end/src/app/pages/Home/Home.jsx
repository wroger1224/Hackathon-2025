import { useSelector } from "react-redux";
import "../../../index.css";

const Home = () => {
	const { user } = useSelector((state) => state.user);
	console.log(user);
	const { profile } = useSelector((state) => state.userProfile);
	console.log(profile);

	return (
		<>

		</>
	)
}

export default Home;
