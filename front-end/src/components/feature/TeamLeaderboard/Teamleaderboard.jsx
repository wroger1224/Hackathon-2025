import { ChevronDown, Trophy, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

// NEW TEAM LEADERBOARD COMPONENT
function TeamLeaderboard() {
	const [showAllTeams, setShowAllTeams] = useState(false);
	const { teams: team } = useSelector((state) => state.community);
	
	// Sort teams by points in descending order
	const sortedTeam = [...team].sort((a, b) => b.Points - a.Points);
	// Show only top 3 teams by default, or all teams when expanded
	const displayedTeams = showAllTeams ? sortedTeam : sortedTeam.slice(0, 3);

  return (
    <div className="w-80 bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">Team Leaderboard</h2>
        <div className="flex gap-2">
          <button className="p-1 text-black hover:bg-gray-100 rounded">
            <Trophy size={18} />
          </button>
          <button className="p-1 text-black hover:bg-gray-100 rounded">
            <Users size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayedTeams.map((team, index) => {
					const {
						CompetitionID,
						Points,
						TeamCaptain,
						TeamID,
						TeamName,
						memberCount,
						totalTeamPoints
					} = team;
					return (
						<div key={index} className="flex items-center gap-3">
							<div className="relative">
								<img
									src={'/api/placeholder/40/40'}
									className="w-10 h-10 rounded-full"
									alt={TeamName}
								/>
								<span
									className={`absolute bottom-0 right-0 w-3 h-3 rounded-full text-black border-2 border-white flex items-center justify-center text-xs text-black font-bold`}
								>
									{index <= 3 ? index : ""}
								</span>
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-center">
									<h4 className="font-medium text-sm text-black truncate">
										{TeamName}
									</h4>
									<span className="text-xs font-medium text-black">
										{ Points } Points
									</span>
								</div>
								<p className="text-xs text-black truncate">
									{memberCount} members
								</p>
							</div>
							{index === 0 && (
								<div className="w-6 h-6 bg-amber-500 text-black rounded-full flex items-center justify-center text-xs">
									<Trophy size={12} />
								</div>
							)}
							{index > 0 && (
								<div
									className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-black font-medium`}
								>
									{index + 1}
								</div>
							)}
						</div>
					)
        })}
      </div>

      <button 
        className="mt-4 text-sm text-black flex items-center justify-center w-full"
        onClick={() => setShowAllTeams(!showAllTeams)}
      >
        <span>{showAllTeams ? "Show Less" : "See All Teams"}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${showAllTeams ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}

export default TeamLeaderboard;
