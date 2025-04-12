import { useSelector } from 'react-redux';

const Leaderboard = () => {
    const { profile } = useSelector((state) => state.userProfile);

    // Mock data for demonstration - replace with actual data from your backend
    const mockLeaderboardData = [
        { rank: 1, name: "John Doe", points: 1500, activities: 25 },
        { rank: 2, name: "Jane Smith", points: 1200, activities: 20 },
        { rank: 3, name: "Mike Johnson", points: 1000, activities: 18 },
        { rank: 4, name: "Sarah Williams", points: 800, activities: 15 },
        { rank: 5, name: "David Brown", points: 600, activities: 12 },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Activity Leaderboard</h1>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Points
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Activities
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockLeaderboardData.map((user) => (
                            <tr 
                                key={user.rank}
                                className={user.name === `${profile?.firstName} ${profile?.lastName}` ? 'bg-blue-50' : 'hover:bg-gray-50'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                            user.rank === 1 ? 'bg-yellow-400' : 
                                            user.rank === 2 ? 'bg-gray-300' : 
                                            user.rank === 3 ? 'bg-amber-600' : 'bg-gray-100'
                                        }`}>
                                            <span className="text-sm font-medium text-gray-900">{user.rank}</span>
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.points}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.activities}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User's current position */}
            {profile && (
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Position</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Current Rank</p>
                            <p className="text-2xl font-bold text-gray-900">#6</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Points to Next Rank</p>
                            <p className="text-2xl font-bold text-gray-900">200</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard; 