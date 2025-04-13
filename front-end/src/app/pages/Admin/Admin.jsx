import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchInitialData,
  createCompetition,
} from "../../../reducers/adminSlice";
import "../../../index.css";
import Widget from "../../../components/common/Widget/Widget";
import { Trophy, Award } from "lucide-react";

const Admin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { competitions, loading, error } = useSelector((state) => state.admin);
  const [newCompetition, setNewCompetition] = useState({
    name: "",
    startDate: "",
    endDate: "",
    notifyParticipants: false,
    postToSlack: false,
    status: "Upcoming",
    numberOfMilestones: 4,
  });

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  const handleCreateCompetition = () => {
    const competition = {
      name: newCompetition.name,
      startDate: newCompetition.startDate,
      endDate: newCompetition.endDate,
      weeklyTheme: null,
      emailParticipants: newCompetition.notifyParticipants,
      postToSlack: newCompetition.postToSlack,
      status: newCompetition.status,
      numberOfMilestones: newCompetition.numberOfMilestones,
    };
    dispatch(createCompetition(competition));
    setNewCompetition({
      name: "",
      startDate: "",
      endDate: "",
      notifyParticipants: false,
      postToSlack: false,
      status: "Upcoming",
      numberOfMilestones: 4,
    });
  };

  // Example user stats data - replace with actual data from your backend
  const userStats = [
    {
      id: 1,
      name: "John Doe",
      points: 1250,
      milestones: ["250 Moints", "500 Moints", "750 Moints", "1000 Moints"],
    },
    {
      id: 2,
      name: "Jane Smith",
      points: 980,
      milestones: ["250 Moints", "500 Moints", "750 Moints"],
    },
    // Add more users as needed
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-3xl mt-6 p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-4">Welcome, {user?.email}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Create Competition Form */}
        <Widget
          id="create-competition-form"
          className="mb-8 p-4 rounded bg-white shadow-md"
        >
          <h2 className="text-xl font-bold mb-4">Create New Competition</h2>
          <div className="space-y-4">
            <div>
              <label>Competition Name: </label>
              <input
                type="text"
                value={newCompetition.name}
                onChange={(e) =>
                  setNewCompetition({ ...newCompetition, name: e.target.value })
                }
                className="bg-gray-100 rounded-md p-2"
                placeholder="Enter competition name"
              />
            </div>
            <div>
              <label>Start Date: </label>
              <input
                type="date"
                value={newCompetition.startDate}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    startDate: e.target.value,
                  })
                }
                className="bg-gray-100 rounded-md p-2"
              />
            </div>
            <div>
              <label>End Date: </label>
              <input
                type="date"
                value={newCompetition.endDate}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    endDate: e.target.value,
                  })
                }
                className="bg-gray-100 rounded-md p-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={newCompetition.status}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    status: e.target.value,
                  })
                }
                className="bg-gray-100 rounded-md p-2"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="milestones">Number of Milestones:</label>
              <select
                id="milestones"
                value={newCompetition.numberOfMilestones}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    numberOfMilestones: parseInt(e.target.value),
                  })
                }
                className="bg-gray-100 rounded-md p-2"
              >
                <option value="1">1 milestone</option>
                <option value="2">2 milestones</option>
                <option value="3">3 milestones</option>
                <option value="4">4 milestones</option>
                <option value="5">5 milestones</option>
                <option value="6">6 milestones</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifyParticipants"
                checked={newCompetition.notifyParticipants}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    notifyParticipants: e.target.checked,
                  })
                }
                className="bg-gray-100 rounded-md p-2"
              />
              <label htmlFor="notifyParticipants">
                Email participants when added to teams
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="postToSlack"
                checked={newCompetition.postToSlack}
                onChange={(e) =>
                  setNewCompetition({
                    ...newCompetition,
                    postToSlack: e.target.checked,
                  })
                }
                className="border p-2"
              />
              <label htmlFor="postToSlack">
                Post challenge updates to Slack channel
              </label>
            </div>


            <button
              onClick={handleCreateCompetition}
              className="bg-orange text-white px-4 py-2 rounded"
            >
              Create Competition
            </button>
          </div>
        </Widget>

        {/* Competitions List */}
        <Widget id="competitions-list" className="mb-8">
          <h2 className="text-xl font-bold mb-4">Competitions</h2>
          <div className="space-y-4">
            {competitions.map((competition) => (
              <div
                key={competition.CompetitionID}
                className={`p-4 rounded bg-gray-50 shadow-md ${
                  competition.Status === "Active" ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">
                      Name: {competition.CompetitionName}
                    </h3>
                    <p>Start: {competition.StartDate}</p>
                    <p>End: {competition.EndDate}</p>
                    <p>Status: {competition.Status}</p>
                  </div>
                  <Link
                    to={`/admin/${competition.CompetitionID}`}
                    className="bg-gray-500 text-white px-3 py-1 rounded ml-4"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* User Stats Widget */}
        <Widget id="user-stats" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">User Statistics</h2>
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-orange" />
              <span className="text-sm text-gray-500">
                Total Users: {userStats.length}
              </span>
            </div>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {userStats.map((user) => (
              <div
                key={user.id}
                className="p-3 shadow-md bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{user.name}</h3>
                  <span className="text-orange font-bold">
                    {user.points} pts
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.milestones.map((milestone, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border border-gray-200"
                    >
                      <Award size={12} className="text-blue-500" />
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default Admin;
