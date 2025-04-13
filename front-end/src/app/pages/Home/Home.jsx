import { useSelector, useDispatch } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import Milestones from "../../../components/feature/Milestones/Milestones";
import "../../../index.css";
import {
  BarChart2,
  FileText,
  MessageCircle,
  Users,
  Settings,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Clock,
  Award,
  Trophy,
  List,
  Grid,
  Target,
  CheckCircle,
  Footprints,
} from "lucide-react";
import TrackingHistory from "../../../components/feature/TrackingHistory/Trackinghistory";
import TeamLeaderboard from "../../../components/feature/TeamLeaderboard/Teamleaderboard";
import TeamMemberActivity from "../../../components/feature/TeamHistory/Teamhistory";
import WorkoutLog from "../../../components/feature/WorkoutLog/WorkoutLog";
import Ballpit from "../../../components/feature/FunStuff/Ballpit";

import { useEffect } from "react";
import { fetchCommunityData } from "../../../reducers/communitySlice";
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { profile } = useSelector((state) => state.userProfile);
  console.log(profile);

  useEffect(() => {
    dispatch(fetchCommunityData());
  }, []);

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
        <TrackingHistory />
        <TeamLeaderboard />
        <TeamMemberActivity />
        <Widget>
          <h3 className="text-xl font-semibold mb-4">Team</h3>
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
          <h3 className="text-xl font-semibold mb-4">Badges</h3>
          <p>Content goes here</p>
        </Widget>

        <Widget className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Workout Log</h3>
          <WorkoutLog />
        </Widget>

        <Widget>
          <h3 className="text-xl font-semibold mb-4">Stats</h3>
          <p>Your workout statistics will appear here</p>
        </Widget>

        <Widget className="md:col-span-2 lg:col-span-3">
          <h3 className="text-xl font-semibold mb-4">Activity Timeline</h3>
          <p>Your recent activities will appear here</p>
        </Widget>
      </div>
      //Component inspired by Kevin Levron:
      //https://x.com/soju22/status/1858925191671271801
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "500px",
          maxHeight: "500px",
          width: "100%",
        }}
      >
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          colors={["#ff5c4d", "#ff9636", "#ffcd58", "#dad870", "#38b1f6"]}
          lightIntensity={100}
        />
      </div>
    </main>
  );
};

export default Home;
