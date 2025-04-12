import { useParams } from "react-router-dom";
import { mockCompetitions, mockUsers } from "../../../data/mockData";
import "../../../index.css";
import { useSelector } from "react-redux";

const CompetitionManagement = () => {
  const { competitionId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [competition, setCompetition] = useState(
    mockCompetitions.find((comp) => comp.id === parseInt(competitionId))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompetition, setEditedCompetition] = useState({});
  const [newTeam, setNewTeam] = useState({
    name: "",
    captain: "",
    members: [],
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editedTeam, setEditedTeam] = useState(null);

  const handleEditClick = () => {
    setEditedCompetition({ ...competition });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCompetition(editedCompetition);
    setIsEditing(false);
    // TODO: Add API call to save changes
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedCompetition((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewTeamChange = (e) => {
    const { name, value } = e.target;
    setNewTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMember = (userId) => {
    if (!userId) return;
    const user = mockUsers.find((u) => u.id === parseInt(userId));
    if (user && !selectedMembers.includes(userId)) {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleRemoveMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((id) => id !== userId));
  };

  const handleEditTeam = (team) => {
    setEditingTeamId(team.id);
    setEditedTeam({
      ...team,
      members: team.members.map((m) => m.id.toString()),
    });
  };

  const handleSaveTeam = () => {
    const updatedTeams = competition.teams.map((team) => {
      if (team.id === editingTeamId) {
        return {
          ...team,
          name: editedTeam.name,
          captain: mockUsers.find((u) => u.id === parseInt(editedTeam.captain)),
          members: editedTeam.members.map((id) =>
            mockUsers.find((u) => u.id === parseInt(id))
          ),
        };
      }
      return team;
    });

    setCompetition((prev) => ({
      ...prev,
      teams: updatedTeams,
    }));
    setEditingTeamId(null);
    setEditedTeam(null);
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setEditedTeam(null);
  };

  const handleAddTeam = () => {
    if (!newTeam.name || !newTeam.captain) return;

    const captain = mockUsers.find(
      (user) => user.id === parseInt(newTeam.captain)
    );
    const members = selectedMembers.map((id) =>
      mockUsers.find((user) => user.id === parseInt(id))
    );

    const newTeamObj = {
      id: competition.teams.length + 1,
      name: newTeam.name,
      captain: captain,
      members: members,
    };

    setCompetition((prev) => ({
      ...prev,
      teams: [...prev.teams, newTeamObj],
    }));

    // Reset form
    setNewTeam({
      name: "",
      captain: "",
      members: [],
    });
    setSelectedMembers([]);
  };

  if (!competition) {
    return <div>Competition not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Manage Competition: {competition.name}
        </h1>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Competition
          </button>
        )}
      </div>
      <p className="mb-4">Welcome, {user?.email}</p>

      <div className="space-y-8">
        {isEditing ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Edit Competition Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedCompetition.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={editedCompetition.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={editedCompetition.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedCompetition.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active Competition
                </label>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Competition Details</h2>
            <p>Start Date: {competition.startDate}</p>
            <p>End Date: {competition.endDate}</p>
            <p>Status: {competition.isActive ? "Active" : "Inactive"}</p>
            <p>Number of Teams: {competition.teams.length}</p>
          </div>
        )}

        {/* Participation Statistics Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Participation Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Last Week's Activity
              </h3>
              <div className="space-y-2">
                <p>
                  Total Participants:{" "}
                  {competition.participationStats.lastWeek.totalParticipants}
                </p>
                <p>
                  Active Participants:{" "}
                  {competition.participationStats.lastWeek.activeParticipants}
                </p>
                <p>
                  Participation Rate:{" "}
                  {competition.participationStats.lastWeek.participationRate}%
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Team Participation</h3>
              <div className="space-y-2">
                {competition.participationStats.lastWeek.teamStats.map(
                  (teamStat) => {
                    const team = competition.teams.find(
                      (t) => t.id === teamStat.teamId
                    );
                    return (
                      <div
                        key={teamStat.teamId}
                        className="flex justify-between items-center"
                      >
                        <span>{team.name}:</span>
                        <span>
                          {teamStat.activeMembers}/{teamStat.totalMembers}{" "}
                          active
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Teams</h2>

          {/* Add New Team Form */}
          <div className="mb-8 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Team</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTeam.name}
                  onChange={handleNewTeamChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Captain
                </label>
                <select
                  name="captain"
                  value={newTeam.captain}
                  onChange={handleNewTeamChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Captain</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Team Member
                </label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => handleAddMember(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select Member</option>
                    {mockUsers
                      .filter(
                        (user) => !selectedMembers.includes(user.id.toString())
                      )
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mt-2">
                  {selectedMembers.map((memberId) => {
                    const member = mockUsers.find(
                      (u) => u.id === parseInt(memberId)
                    );
                    return (
                      <div
                        key={memberId}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1"
                      >
                        <span>{member.name}</span>
                        <button
                          onClick={() => handleRemoveMember(memberId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={handleAddTeam}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Team
              </button>
            </div>
          </div>

          {/* Teams List */}
          <div className="space-y-4">
            {competition.teams.map((team) => (
              <div key={team.id} className="border rounded-lg p-4">
                {editingTeamId === team.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Team Name
                      </label>
                      <input
                        type="text"
                        value={editedTeam.name}
                        onChange={(e) =>
                          setEditedTeam({ ...editedTeam, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Team Captain
                      </label>
                      <select
                        value={editedTeam.captain}
                        onChange={(e) =>
                          setEditedTeam({
                            ...editedTeam,
                            captain: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {mockUsers.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Team Members
                      </label>
                      <select
                        onChange={(e) => {
                          if (
                            e.target.value &&
                            !editedTeam.members.includes(e.target.value)
                          ) {
                            setEditedTeam({
                              ...editedTeam,
                              members: [...editedTeam.members, e.target.value],
                            });
                          }
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Add Member</option>
                        {mockUsers
                          .filter(
                            (user) =>
                              !editedTeam.members.includes(user.id.toString())
                          )
                          .map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                      </select>
                      <div className="mt-2">
                        {editedTeam.members.map((memberId) => {
                          const member = mockUsers.find(
                            (u) => u.id === parseInt(memberId)
                          );
                          return (
                            <div
                              key={memberId}
                              className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1"
                            >
                              <span>{member.name}</span>
                              <button
                                onClick={() =>
                                  setEditedTeam({
                                    ...editedTeam,
                                    members: editedTeam.members.filter(
                                      (id) => id !== memberId
                                    ),
                                  })
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveTeam}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{team.name}</h3>
                        <p className="text-sm text-gray-600">
                          Captain: {team.captain.name}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditTeam(team)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Members:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {team.members.map((member) => (
                          <li key={member.id}>{member.name}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionManagement;
