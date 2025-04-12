import { useSelector } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import TeamActivity from "../../../components/feature/TeamActivity/TeamActivity";
import Milestones from "../../../components/feature/Milestones/Milestones";
import Leaderboard from "../../../components/feature/Leaderboard/Leaderboard";
import "../../../index.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { profile } = useSelector((state) => state.userProfile);
  console.log(profile);

  return (
    <main id="home-main">
      <div id="home-container">
        <h1>Welcome {profile.name} to Maxxtivity</h1>
        <h2></h2>
        <p>
          Here you can see your progress and your current level. You can also
          see your current competition and your progress in it.
        </p>
      </div>
      <div
        id="home-widgets"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      >
        <Widget>
          <h3 className="text-xl font-semibold mb-4">Team</h3>
          <TeamActivity />
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
          <Leaderboard />
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Add Workout</h3>
          <p>Content goes here</p>
        </Widget>

        <Widget className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Minutes</h3>
					<Milestones />
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Widget 4</h3>
        </Widget>
      </div>
    </main>
  );
};

export default Home;
