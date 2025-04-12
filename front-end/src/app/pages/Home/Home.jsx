import { useSelector } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import "../../../index.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { profile } = useSelector((state) => state.userProfile);
  console.log(profile);

  return (
    <>
      <div id="home-container">
        <h1>Home</h1>
        <h2>Welcome to Maxxtivity</h2>
        <h3>
          Here you can see your progress and your current level. You can also
          see your current competition and your progress in it.
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Widget>
          <h3 className="text-xl font-semibold mb-4">Widget 1</h3>
          <p>Content goes here</p>
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Widget 2</h3>
          <p>Content goes here</p>
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Widget 3</h3>
          <p>Content goes here</p>
        </Widget>

        <Widget className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Minutes</h3>
          <p>This widget spans two columns</p>
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Widget 4</h3>
          <p>Content goes here</p>
        </Widget>
      </div>
    </>
  );
};

export default Home;
