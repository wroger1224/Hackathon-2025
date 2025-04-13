import { Clock, ChevronDown, Footprints } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { useEffect } from "react";

function TrackingHistory() {
	const user = useSelector(state => state.user);
	const { userData } = user || {};
	const { allActivities } = userData || {};
	const parsedActivities = eval(allActivities) || [];
	const [showWeekDropdown, setShowWeekDropdown] = useState(false);

	// Function to group activities by week
	const groupActivitiesByWeek = (activities) => {
		const weeklyActivities = {};
		
		activities.forEach(activity => {
			const activityDate = new Date(activity.lastUpdated);
			const weekStart = startOfWeek(activityDate, { weekStartsOn: 0 }); // Start week on Sunday
			const weekEnd = endOfWeek(activityDate, { weekStartsOn: 0 });
			const weekKey = format(weekStart, 'yyyy-MM-dd');
			
			if (!weeklyActivities[weekKey]) {
				weeklyActivities[weekKey] = {
					startDate: weekStart,
					endDate: weekEnd,
					activities: [],
					totalMinutes: 0,
					totalPoints: 0
				};
			}
			
			weeklyActivities[weekKey].activities.push(activity);
			weeklyActivities[weekKey].totalMinutes += activity.totalTime || 0;
			weeklyActivities[weekKey].totalPoints += activity.totalPoints || 0;
		});

		// Sort weeks by date (newest first)
		return Object.entries(weeklyActivities)
			.sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
			.reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {});
	};

	const weeklyData = groupActivitiesByWeek(parsedActivities);
	const weekKeys = Object.keys(weeklyData) || [];
	const [selectedPeriod, setSelectedPeriod] = useState(null);
	const activityData = weeklyData[selectedPeriod] || {};
	const { activities } = activityData || {};
	const sortActivities = activities?.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
	console.log(activityData);
	console.log(sortActivities);
	const weeklyTotal = sortActivities?.reduce((acc, activity) => acc + activity.totalPoints, 0) || 0;
	const weeklyTopDay = Math.max(sortActivities?.map((activity) => activity.totalPoints)) || 0;
	const avgDaily = weeklyTotal / sortActivities?.length || 0;	const maxPoints = Math.max(sortActivities?.map((item) => item.totalPoints)) || 0;
	const roundedMaxPoints = Math.ceil(weeklyTopDay / 10) * 10; // Round up to nearest 10
	console.log(weeklyTotal);

	useEffect(() => {
		if (weekKeys.length > 0 && !selectedPeriod) {
			setSelectedPeriod(weekKeys[0]);
		}
	}, [weekKeys]);
	console.log(sortActivities);


	return (
		<div className="flex-1 bg-white rounded-3xl shadow-sm p-6 w-full">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h2 className="text-lg font-bold text-gray-800">Activity Tracking</h2>
					<p className="text-sm text-gray-500">Daily Points</p>
				</div>

				<div className="relative">
					<button className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md text-sm" onClick={() => setShowWeekDropdown(!showWeekDropdown)}>
						<span>{selectedPeriod ? selectedPeriod : 'Select Week'}</span>
						<ChevronDown size={16} />
					</button>
					{showWeekDropdown && (
					<div className="absolute right-0 mt-2 w-30 bg-white shadow-lg rounded-md">
						{weekKeys.map((weekKey) => (
							<button
								key={weekKey}
								className="w-full text-left px-3 py-2 hover:bg-gray-100"
								onClick={() => setSelectedPeriod(weekKey)}
							>
								{weekKey}
							</button>
						))}
					</div>
					)}
				</div>
				
			</div>

			<div className="relative h-80">
				{/* Y-axis labels (time in minutes) */}
				<div className="absolute left-0 top-4 h-64 flex flex-col justify-between text-xs text-gray-400">
					<span>{roundedMaxPoints} min</span>
					<span>{Math.floor(roundedMaxPoints * 0.75)} min</span>
					<span>{Math.floor(roundedMaxPoints * 0.5)} min</span>
					<span>{Math.floor(roundedMaxPoints * 0.25)} min</span>
					<span>0 min</span>
				</div>

				{/* Horizontal grid lines */}
				<div className="absolute left-12 right-4 top-4 h-64 flex flex-col justify-between">
					{[0, 1, 2, 3, 4].map((idx) => (
						<div key={idx} className="border-t border-gray-100 w-full"></div>
					))}
				</div>

				{/* Bar Chart */}
				<div className="flex items-end justify-between h-64 gap-2 pl-12 pr-4 pt-4 mt-4">
					{sortActivities?.map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-center group relative"
							style={{ width: "40px" }}
						>
							{/* Bar */}
							<div
								className={`rounded-t-md transition-all hover:opacity-80 ${
									index === 3 ? "bg-[#FF9500]" : "bg-[#3B82F6]"
								}`}
								style={{
									height: `${(item.totalPoints / roundedMaxPoints) * 240}px`,
									width: "24px",
								}}
							>
								{/* Tooltip */}
								<div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
									<div className="bg-black text-white rounded-md px-3 py-2 text-xs shadow-lg whitespace-nowrap">
										<div className="flex items-center mb-1">
											<Clock size={12} className="mr-1" />
											<span>{item.totalPoints} points</span>
										</div>
										<div className="flex items-center">
											<Footprints size={12} className="mr-1" />
											<span>{item.totalTime} minutes</span>
										</div>
									</div>
								</div>
							</div>

							{/* X-axis label (date) */}
							<span className="text-xs text-gray-500 mt-2">
								{format(new Date(item.lastUpdated), 'MMM d')}
							</span>
						</div>
					))}
				</div>

				{/* Stat summary */}
				<div className="flex justify-between mt-6 border-t pt-4 border-gray-100">
					<div className="text-center">
						<p className="text-xs text-gray-500">Avg. Daily</p>
						<p className="font-bold text-gray-800">
							{avgDaily}
							min
						</p>
					</div>
					<div className="text-center">
						<p className="text-xs text-gray-500">Top Day</p>
						<p className="font-bold text-gray-800">
							{weeklyTopDay} points
						</p>
					</div>
					<div className="text-center">
						<p className="text-xs text-gray-500">Weekly Total</p>
						<p className="font-bold text-gray-800">
							{weeklyTotal} points
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrackingHistory;
