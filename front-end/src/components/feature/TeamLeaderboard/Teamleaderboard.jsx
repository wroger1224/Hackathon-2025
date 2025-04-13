import { ChevronDown, Trophy, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

// NEW TEAM LEADERBOARD COMPONENT
function TeamLeaderboard() {
	const [showAllTeams, setShowAllTeams] = useState(false);
	const { teams: team } = useSelector((state) => state.community);
	
	// Sort teams by points in descending order
	const sortedTeam = [...team].sort((a, b) => b.totalTeamPoints - a.totalTeamPoints);
	// Show only top 3 teams by default, or all teams when expanded
	const displayedTeams = showAllTeams ? sortedTeam : sortedTeam.slice(0, 3);

  return (
    <div className="rounded-3xl p-6 shadow-sm bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">Team Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {displayedTeams.map((team, index) => {
					const {
						TeamName,
						memberCount,
						totalTeamPoints
					} = team;
					return (
						<div key={index} className="flex items-center gap-3">
							<div className="flex-1 min-w-0">
								<div className="flex justify-between items-center">
									<h4 className="font-medium text-sm text-black truncate">
										{TeamName}
									</h4>
									<span className="text-xs font-medium text-black">
										{ totalTeamPoints } Moints
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
