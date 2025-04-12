import { useSelector } from "react-redux";
import { mockUsers, mockCompetitions } from "../../../data/mockData";
import { Link } from "react-router-dom";

const Admin = () => {
    const { user } = useSelector((state) => state.user);
    const [competitions, setCompetitions] = useState(mockCompetitions);
    const [newCompetition, setNewCompetition] = useState({
        name: "",
        startDate: "",
        endDate: "",
        notifyParticipants: false,
        postToSlack: false,
        isActive: false
    });

    const handleCreateCompetition = () => {
        const competition = {
            id: competitions.length + 1,
            ...newCompetition,
            teams: []
        };
        setCompetitions([...competitions, competition]);
        setNewCompetition({
            name: "",
            startDate: "",
            endDate: "",
            notifyParticipants: false,
            postToSlack: false,
            isActive: false
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-4">Welcome, {user?.email}</p>

            {/* Create Competition Form */}
            <div className="mb-8 p-4 border rounded">
                <h2 className="text-xl font-bold mb-4">Create New Competition</h2>
                <div className="space-y-4">
                    <div>
                        <label>Competition Name:</label>
                        <input
                            type="text"
                            value={newCompetition.name}
                            onChange={(e) => setNewCompetition({ ...newCompetition, name: e.target.value })}
                            className="border p-2"
                            placeholder="Enter competition name"
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={newCompetition.startDate}
                            onChange={(e) => setNewCompetition({ ...newCompetition, startDate: e.target.value })}
                            className="border p-2"
                        />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input
                            type="date"
                            value={newCompetition.endDate}
                            onChange={(e) => setNewCompetition({ ...newCompetition, endDate: e.target.value })}
                            className="border p-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="notifyParticipants"
                            checked={newCompetition.notifyParticipants}
                            onChange={(e) => setNewCompetition({ ...newCompetition, notifyParticipants: e.target.checked })}
                            className="border p-2"
                        />
                        <label htmlFor="notifyParticipants">Email participants when added to teams</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="postToSlack"
                            checked={newCompetition.postToSlack}
                            onChange={(e) => setNewCompetition({ ...newCompetition, postToSlack: e.target.checked })}
                            className="border p-2"
                        />
                        <label htmlFor="postToSlack">Post challenge updates to Slack channel</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={newCompetition.isActive}
                            onChange={(e) => setNewCompetition({ ...newCompetition, isActive: e.target.checked })}
                            className="border p-2"
                        />
                        <label htmlFor="isActive">Make this the active competition</label>
                    </div>
                    <button
                        onClick={handleCreateCompetition}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Competition
                    </button>
                </div>
            </div>

            {/* Competitions List */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Competitions</h2>
                <div className="space-y-4">
                    {competitions.map((competition) => (
                        <div
                            key={competition.id}
                            className={`p-4 border rounded ${competition.isActive ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">Name: {competition.name}</h3>
                                    <p>Start: {competition.startDate}</p>
                                    <p>End: {competition.endDate}</p>
                                    <p>Status: {competition.isActive ? 'Active' : 'Inactive'}</p>
                                    <p>Teams: {competition.teams.length}</p>
                                </div>
                                <Link
                                    to={`/admin/${competition.id}`}
                                    className="bg-gray-500 text-white px-3 py-1 rounded"
                                >
                                    Manage
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin; 