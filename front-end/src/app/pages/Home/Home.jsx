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
import Modal from "react-modal";
import Badges from "../../../components/feature/Badges/Badges";
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
          <div id="home-container" className="relative z-10">
            <h1 className="text-2xl font-bold text-gray-800 bg-white/95 inline-block px-4 py-2 rounded-lg">
              Welcome {profile.name} to Maxxtivity
            </h1>
            <h2></h2>
            <p className="text-gray-600 bg-white/95 inline-block px-4 py-2 rounded-lg mt-2">
              Here you can see your progress and your current level. You can
              also see your current competition and your progress in it.
            </p>
          </div>
          <div
            id="home-widgets"
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 "
          >
            <TrackingHistory />

            <Widget className="lg:col-span-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
              <h2 className="text-xl font-semibold mb-4">Workout Log</h2>
              <WorkoutLog setSuccessMessage={setSuccessMessage} />
            </Widget>

            <TeamLeaderboard />

            <TeamMemberActivity />

            <Widget className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
              <h2 className="text-xl font-semibold mb-4 ">Badges</h2>
              <Badges />
            </Widget>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <h2>Modal Title</h2>
              <button onClick={closeModal}>Close</button>
              <div>{successMessage}</div>
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
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          colors={["#ff5c4d", "#ff9636", "#ffcd58", "#dad870", "#38b1f6"]}
          lightIntensity={50}
        />
      </div>
    </div>
  );
};

export default Home;
