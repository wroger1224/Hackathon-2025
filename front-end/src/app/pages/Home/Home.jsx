import { useSelector } from "react-redux";
import "../../../index.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
