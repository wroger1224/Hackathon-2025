import { useParams } from 'react-router-dom';
import "../../../index.css"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchInitialData, createTeam, updateTeam, updateCompetition } from '../../../reducers/adminSlice';

const CompetitionManagement = () => {
    const { competitionId } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { competitions, teams, users, loading, error } = useSelector((state) => state.admin);
    const [competition, setCompetition] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCompetition, setEditedCompetition] = useState({});
    const [newTeam, setNewTeam] = useState({
        name: '',
        captain: '',
        members: []
    });
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [editedTeam, setEditedTeam] = useState(null);

    useEffect(() => {
        dispatch(fetchInitialData());
    }, [dispatch]);

    useEffect(() => {
        if (competitions && competitionId) {
            const foundCompetition = competitions.find(comp => comp.CompetitionID === parseInt(competitionId));
            if (foundCompetition) {
                setCompetition({
                    ...foundCompetition,
                    teams: teams.filter(team => team.CompetitionID === foundCompetition.CompetitionID)
                });
            }
        }
    }, [competitions, teams, competitionId]);

    const handleEditClick = () => {
        setEditedCompetition({ ...competition });
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await dispatch(updateCompetition({
                competitionId: competition.CompetitionID,
                competitionData: {
                    CompetitionName: editedCompetition.CompetitionName,
                    StartDate: editedCompetition.StartDate,
                    EndDate: editedCompetition.EndDate,
                    Status: editedCompetition.Status,
                    WeeklyTheme: editedCompetition.WeeklyTheme
                }
            })).unwrap();

            // Refresh data to get the latest state
            await dispatch(fetchInitialData()).unwrap();
            
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating competition:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedCompetition(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNewTeamChange = (e) => {
        const { name, value } = e.target;
        setNewTeam(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMember = (userId) => {
        if (!userId) return;
        const user = users.find(u => u.UserID === userId);
        if (user && !selectedMembers.includes(userId)) {
            setSelectedMembers([...selectedMembers, userId]);
        }
    };

    const handleRemoveMember = (userId) => {
        setSelectedMembers(selectedMembers.filter(id => id !== userId));
    };

    const handleEditTeam = (team) => {
        setEditingTeamId(team.TeamID);
        setEditedTeam({
            ...team,
            members: team.members.map(m => m.UserID.toString())
        });
    };

    const handleSaveTeam = async () => {
        try {
            // Update team members
            const currentMembers = editedTeam.members;
            const originalMembers = competition.teams.find(t => t.TeamID === editingTeamId).members.map(m => m.UserID);
            
            // Find members to add and remove
            const membersToAdd = currentMembers.filter(id => !originalMembers.includes(id));
            const membersToRemove = originalMembers.filter(id => !currentMembers.includes(id));
            
            // Add new members
            for (const memberId of membersToAdd) {
                await dispatch(updateTeam({
                    teamId: editingTeamId,
                    action: 'add',
                    memberId: memberId
                })).unwrap();
            }
            
            // Remove members
            for (const memberId of membersToRemove) {
                await dispatch(updateTeam({
                    teamId: editingTeamId,
                    action: 'remove',
                    memberId: memberId
                })).unwrap();
            }
            
            // Refresh data
            await dispatch(fetchInitialData()).unwrap();
            
            setEditingTeamId(null);
            setEditedTeam(null);
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTeamId(null);
        setEditedTeam(null);
    };

    const handleAddTeam = async () => {
        if (!newTeam.name || !newTeam.captain) return;

        try {
            // Ensure captain is included in members array
            const allMembers = [...new Set([newTeam.captain, ...selectedMembers])];
            
            await dispatch(createTeam({
                name: newTeam.name,
                captainId: newTeam.captain,
                members: allMembers,
                competitionId: competition.CompetitionID
            })).unwrap();

            // Refresh data
            await dispatch(fetchInitialData()).unwrap();

            // Reset form
            setNewTeam({
                name: '',
                captain: '',
                members: []
            });
            setSelectedMembers([]);
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!competition) {
        return <div>Competition not found</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Competition: {competition.CompetitionName}</h1>
                {!isEditing && (
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Edit Competition
                    </button>
                )}
            </div>
            <p className="mb-4">Welcome, {user?.Email}</p>
            
            <div className="space-y-8">
                {isEditing ? (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Edit Competition Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="CompetitionName"
                                    value={editedCompetition.CompetitionName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="StartDate"
                                    value={editedCompetition.StartDate}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="EndDate"
                                    value={editedCompetition.EndDate}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="Status"
                                    value={editedCompetition.Status}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Active">Active</option>
                                    <option value="Completed">Completed</option>
                                </select>
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
                        <p>Start Date: {competition.StartDate}</p>
                        <p>End Date: {competition.EndDate}</p>
                        <p>Status: {competition.Status}</p>
                        <p>Number of Teams: {competition.teams?.length || 0}</p>
                    </div>
                )}

                {/* Teams Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Teams</h2>
                    
                    {/* Add New Team Form */}
                    <div className="mb-8 p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Add New Team</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Team Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newTeam.name}
                                    onChange={handleNewTeamChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Team Captain</label>
                                <select
                                    name="captain"
                                    value={newTeam.captain}
                                    onChange={handleNewTeamChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Select Captain</option>
                                    {users?.map(user => (
                                        <option key={user.UserID} value={user.UserID}>
                                            {user.FirstName} {user.LastName} ({user.Email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Add Team Member</label>
                                <div className="flex gap-2">
                                    <select
                                        onChange={(e) => handleAddMember(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select Member</option>
                                        {users
                                            ?.filter(user => !selectedMembers.includes(user.UserID))
                                            .map(user => (
                                                <option key={user.UserID} value={user.UserID}>
                                                    {user.FirstName} {user.LastName} ({user.Email})
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    {selectedMembers.map(memberId => {
                                        const member = users?.find(u => u.UserID === memberId);
                                        return (
                                            <div key={memberId} className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1">
                                                <span>{member?.FirstName} {member?.LastName} ({member?.Email})</span>
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
                        {competition.teams?.map(team => (
                            <div key={team.TeamID} className="border rounded-lg p-4">
                                {editingTeamId === team.TeamID ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Team Name</label>
                                            <input
                                                type="text"
                                                value={editedTeam.name}
                                                onChange={(e) => setEditedTeam({...editedTeam, name: e.target.value})}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Team Captain</label>
                                            <select
                                                value={editedTeam.captain}
                                                onChange={(e) => setEditedTeam({...editedTeam, captain: e.target.value})}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                {users?.map(user => (
                                                    <option key={user.UserID} value={user.UserID}>
                                                        {user.FirstName} {user.LastName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Team Members</label>
                                            <select
                                                onChange={(e) => {
                                                    if (e.target.value && !editedTeam.members.includes(e.target.value)) {
                                                        setEditedTeam({
                                                            ...editedTeam,
                                                            members: [...editedTeam.members, e.target.value]
                                                        });
                                                    }
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                <option value="">Add Member</option>
                                                {users
                                                    ?.filter(user => !editedTeam.members.includes(user.UserID.toString()))
                                                    .map(user => (
                                                        <option key={user.UserID} value={user.UserID}>
                                                            {user.FirstName} {user.LastName}
                                                        </option>
                                                    ))}
                                            </select>
                                            <div className="mt-2">
                                                {editedTeam.members.map(memberId => {
                                                    const member = users?.find(u => u.UserID === parseInt(memberId));
                                                    return (
                                                        <div key={memberId} className="flex items-center justify-between bg-gray-100 p-2 rounded mt-1">
                                                            <span>{member?.FirstName} {member?.LastName}</span>
                                                            <button
                                                                onClick={() => setEditedTeam({
                                                                    ...editedTeam,
                                                                    members: editedTeam.members.filter(id => id !== memberId)
                                                                })}
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
                                                <h3 className="text-lg font-semibold">{team.TeamName}</h3>
                                                <p className="text-sm text-gray-600">Captain: {team.TeamCaptain?.FirstName} {team.TeamCaptain?.LastName}</p>
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
                                                {team.members?.map(member => (
                                                    <li key={member.UserID}>{member.FirstName} {member.LastName}</li>
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