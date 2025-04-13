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
import { fetchCommunityData } from "../../../reducers/communitySlice";
import { fetchUserDataThunk } from "../../../reducers/userSlice";
import { useEffect, useState } from "react";
import Modal from 'react-modal';

const Home = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	console.log(user);
	const { profile } = useSelector((state) => state.userProfile);
	console.log(profile);

	const [successMessage, setSuccessMessage] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
    
	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	useEffect(() => {
		if (successMessage) {
			setTimeout(() => {
				openModal();
			}, 1000);

			setTimeout(() => {
				closeModal();
				setSuccessMessage(null);
			}, 4000);
		}
	}, [successMessage]);

  useEffect(() => {
    dispatch(fetchCommunityData());
    dispatch(fetchUserDataThunk());
  }, [dispatch]);

  return (
    <div className="relative w-full">
      <main id="home-main" className="min-h-screen">
        <div className="pb-[400px]">
          <div id="home-container">
            <h1>Welcome {profile.name} to Maxxtivity</h1>
            <h2></h2>
            <p>
              Here you can see your progress and your current level. You can
              also see your current competition and your progress in it.
            </p>
          </div>
          <div
            id="home-widgets"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          >
            <TrackingHistory />

            <Widget className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Workout Log</h2>
              <WorkoutLog setSuccessMessage={setSuccessMessage}/>
            </Widget>

            <Widget className="md:col-span-3">
              <h3 className="text-xl font-semibold mb-4"></h3>
              <Milestones />
            </Widget>

            <TeamLeaderboard />

            <TeamMemberActivity />

            <Widget>
              <h2 className="text-xl font-semibold mb-4">Badges</h2>
              <p>Content goes here</p>
            </Widget>
						<Modal
							isOpen={modalIsOpen}
							onRequestClose={closeModal}
							contentLabel="Example Modal"
						>
							<h2>Modal Title</h2>
							<button onClick={closeModal}>Close</button>
							<div>{ successMessage }</div>
          	</Modal>
        </div>
			</div>
      </main>

      {/* Ballpit overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100vw",
          height: "700px",
          zIndex: 9999,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Ballpit
          count={150}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          colors={["#ff5c4d", "#ff9636", "#ffcd58", "#dad870", "#38b1f6"]}
          lightIntensity={100}
        />
      </div>
    </div>
  );
};

export default Home;
