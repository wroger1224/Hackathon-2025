import { useSelector } from "react-redux";
import Widget from "../../../components/common/Widget/Widget";
import TeamActivity from "../../../components/feature/TeamActivity/TeamActivity";
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
const Home = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { profile } = useSelector((state) => state.userProfile);
	const { competition, teams, users, milestones, status, error } = useSelector((state) => state.community);

	useEffect(() => {
		dispatch(fetchCommunityData());
	}, [dispatch]);

	if (status === 'loading') {
		return <div>Loading community data...</div>;
	}

	if (status === 'failed') {
		return <div>Error loading community data: {error}</div>;
	}

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
          <TeamActivity />
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
      </div>
    </main>
  );
};

export default Home;
