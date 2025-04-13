import {Award, Clock, ChevronDown, Footprints, MoreHorizontal, Users } from "lucide-react";

// NEW TEAM MEMBER ACTIVITY COMPONENT
function TeamMemberActivity() {
    const teamActivities = [
      {
        memberName: 'Alex Chen',
        team: 'Road Runners',
        activity: 'Morning Run',
        time: 'Today • 6:00 - 7:15',
        steps: 8420,
        calories: 450,
        avatar: '/api/placeholder/40/40'
      },
      {
        memberName: 'Maya Johnson',
        team: 'Road Runners',
        activity: 'Lunch Walk',
        time: 'Today • 12:30 - 13:15',
        steps: 5680,
        calories: 280,
        avatar: '/api/placeholder/40/40'
      },
      {
        memberName: 'Taylor Wong',
        team: 'Road Runners',
        activity: 'Evening Jog',
        time: 'Yesterday • 18:00 - 19:00',
        steps: 7240,
        calories: 380,
        avatar: '/api/placeholder/40/40'
      }
    ];
  
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Team Activity</h2>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Users size={12} className="mr-1" />
              <span>Road Runners • 12 members</span>
            </div>
          </div>
          <button className="text-sm text-gray-500">See All &rarr;</button>
        </div>
        
        <div className="space-y-4">
          {teamActivities.map((activity, index) => (
            <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{activity.memberName}</h4>
                  <button>
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </div>
                <p className="text-sm text-gray-700">{activity.activity}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock size={12} className="mr-1" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Footprints size={12} className="mr-1 text-purple-500" />
                    <span>{activity.steps.toLocaleString()} steps</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Award size={12} className="mr-1 text-green-500" />
                    <span>{activity.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default TeamMemberActivity;
