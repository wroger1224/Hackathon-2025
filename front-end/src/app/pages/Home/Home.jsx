import Header from "../../../Header";
import { useSelector } from "react-redux";
import "../../../index.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <Header />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
