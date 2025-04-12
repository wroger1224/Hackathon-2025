import { useSelector } from "react-redux";
import "../../../index.css";

const Home = () => {
	const { user } = useSelector((state) => state.user);
	console.log(user);
	const { profile } = useSelector((state) => state.userProfile);
	console.log(profile);

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome to the Home Page</h2>
      <h3>
        Here you can see your progress and your current level. You can also
        see your current competition and your progress in it.
      </h3>
    </div>
  );
};

export default Home;
