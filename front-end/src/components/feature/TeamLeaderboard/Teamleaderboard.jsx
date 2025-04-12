import { ChevronDown, Trophy, Users } from "lucide-react";

// NEW TEAM LEADERBOARD COMPONENT
function TeamLeaderboard() {
  const teams = [
    {
      name: "Road Runners",
      members: 12,
      steps: 148520,
      rank: 1,
      avatar: "/api/placeholder/40/40",
      color: "bg-amber-500",
    },
    {
      name: "Pace Makers",
      members: 8,
      steps: 135680,
      rank: 2,
      avatar: "/api/placeholder/40/40",
      color: "bg-gray-500",
    },
    {
      name: "Trail Blazers",
      members: 10,
      steps: 123450,
      rank: 3,
      avatar: "/api/placeholder/40/40",
      color: "bg-orange-400",
    },
    {
      name: "Sprint Stars",
      members: 7,
      steps: 115780,
      rank: 4,
      avatar: "/api/placeholder/40/40",
      color: "bg-gray-300",
    },
    {
      name: "Marathon Masters",
      members: 9,
      steps: 106200,
      rank: 5,
      avatar: "/api/placeholder/40/40",
      color: "bg-gray-300",
    },
  ];

  return (
    <div className="w-80 bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Team Leaderboard</h2>
        <div className="flex gap-2">
          <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <Trophy size={18} />
          </button>
          <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <Users size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative">
              <img
                src={team.avatar}
                className="w-10 h-10 rounded-full"
                alt={team.name}
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${team.color} border-2 border-white flex items-center justify-center text-xs text-white font-bold`}
              >
                {team.rank <= 3 ? team.rank : ""}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm text-gray-900 truncate">
                  {team.name}
                </h4>
                <span className="text-xs font-medium text-green-500">
                  {team.steps.toLocaleString()} steps
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {team.members} members
              </p>
            </div>
            {team.rank === 1 && (
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">
                <Trophy size={12} />
              </div>
            )}
            {team.rank > 1 && (
              <div
                className={`w-5 h-5 ${
                  team.rank <= 3 ? team.color : "bg-gray-200"
                } rounded-full flex items-center justify-center text-xs text-white font-medium`}
              >
                {team.rank}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-gray-500 flex items-center justify-center w-full">
        <span>See All Teams</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

export default TeamLeaderboard;
