import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInitialData, createCompetition } from "../../../reducers/adminSlice";
import "../../../index.css"

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
        status: "Upcoming"
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
            status: newCompetition.status
        };
        dispatch(createCompetition(competition));
        setNewCompetition({
            name: "",
            startDate: "",
            endDate: "",
            notifyParticipants: false,
            postToSlack: false,
            status: "Upcoming"
        });
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-white">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-4">Welcome, {user?.email}</p>

            {/* Create Competition Form */}
            <div id="create-competition-form" className="mb-8 p-4 border rounded bg-white shadow-md">
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
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            value={newCompetition.status}
                            onChange={(e) => setNewCompetition({ ...newCompetition, status: e.target.value })}
                            className="border p-2"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Active">Active</option>
                        </select>
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

                    <button
                        onClick={handleCreateCompetition}
                        className="bg-orange text-white px-4 py-2 rounded"
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
                            key={competition.CompetitionID}
                            className={`p-4 border rounded bg-white shadow-md ${competition.Status === 'Active' ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold">Name: {competition.CompetitionName}</h3>
                                    <p>Start: {competition.StartDate}</p>
                                    <p>End: {competition.EndDate}</p>
                                    <p>Status: {competition.Status}</p>
                                </div>
                                <Link
                                    to={`/admin/${competition.CompetitionID}`}
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