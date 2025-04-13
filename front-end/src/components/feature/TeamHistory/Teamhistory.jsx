import {Award, Clock, ChevronDown, Hourglass, MoreHorizontal, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

// NEW TEAM MEMBER ACTIVITY COMPONENT
function TeamMemberActivity() {
	const community = useSelector(state => state.community);
	const { users } = community;
	const userProfile = useSelector(state => state.userProfile);
	const { profile } = userProfile;
	const { TeamID, TeamName } = profile;
	const team = users.filter(user => user.TeamID === TeamID);
	const teamLength = team?.length;
	const teamObject = team?.map(user => {
		const allActivities = JSON.parse(user.allActivities);
		const sortedActivities = allActivities.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
		return {
			FirstName: user.FirstName,
			LastName: user.LastName,
			TeamID: user.TeamID,
			allActivities: sortedActivities,
			totalTime: sortedActivities.reduce((acc, activity) => acc + activity.totalTime, 0),
			totalPoints: sortedActivities.reduce((acc, activity) => acc + activity.totalPoints, 0)
		}
	})

	const [showAllTeams, setShowAllTeams] = useState(false);
	
	const displayedTeam = showAllTeams ? teamObject : teamObject.slice(0, 3);

  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Team Activity</h2>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Users size={12} className="mr-1" />
              <span>{ TeamName } • { teamLength } members</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {displayedTeam.map((activity, index) => (
            <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{activity.FirstName} {activity.LastName}</h4>
                </div>
                <p className="text-sm text-gray-700">{activity.allActivities[0]?.userInput}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock size={12} className="mr-1" />
                  <span>{activity.allActivities[0]?.lastUpdated}</span>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Award size={12} className="mr-1 text-purple-500" />
                    <span>{activity.totalPoints} points</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Hourglass size={12} className="mr-1 text-green-500" />
                    <span>{activity.totalTime} minutes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
					
        </div>
				<button 
        className="mt-4 text-sm text-black flex items-center justify-center w-full"
        onClick={() => setShowAllTeams(!showAllTeams)}
      >
        <span>{showAllTeams ? "Show Less" : "See All Team Members"}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${showAllTeams ? 'rotate-180' : ''}`}
        />
      </button>
      </div>
  );
}

export default TeamMemberActivity;
