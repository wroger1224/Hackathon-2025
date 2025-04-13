import Form from "../../common/Form/Form"
import Input from "../../common/Input/Input"
import Button from "../../common/Button/Button"
import { useState } from "react"

const Milestones = () => {
			//user should be able to add activity data
		//need api implementation for adding activity data

		//user should be able to see milestones they've completed
		//need api implementation for seeing milestones they've completed

		//user should be able to see the activity data for themself
		//need api implementation for seeing activity data for themself

	const [formFields, setFormFields] = useState({
		userInput: "",
	})

	//needs to factor in currect competition
	const MilestoneData = [
		{
			MilestoneID: 1,
			CompetitionID: 1,
			MilestoneTime: 30,
			MilestoneImage: "https://via.placeholder.com/150?text=Milestone+1",
		},
		{
			MilestoneID: 2,
			CompetitionID: 1,
			MilestoneTime: 60,
			MilestoneImage: "https://via.placeholder.com/150?text=Milestone+2",
		},
		{
			MilestoneID: 3,
			CompetitionID: 2, // Different competition
			MilestoneTime: 70,
			MilestoneImage: "https://via.placeholder.com/150?text=Milestone+3",
		},
		{
			MilestoneID: 4,
			CompetitionID: 2, // Different competition
			MilestoneTime: 90,
			MilestoneImage: "https://via.placeholder.com/150?text=Milestone+4",
		},
		{
			MilestoneID: 5,
			CompetitionID: 1,
			MilestoneTime: 80,
			MilestoneImage: "https://via.placeholder.com/150?text=Milestone+2",
		},
	]

	const userMilestoneData = [
		{
			UserMilestoneID: 1,
			UserID: 1,
			MilestoneID: 1,
			CompetitionID: 1,
			CompletionDate: "2025-01-01",
		},
		{
			UserMilestoneID: 2,
			UserID: 1,
			MilestoneID: 2,
			CompetitionID: 1,
			CompletionDate: "2025-01-02",
		},
		{
			UserMilestoneID: 3,
			UserID: 1,
			MilestoneID: 3,
			CompetitionID: 2, // Different competition
			CompletionDate: "2025-01-03",
		}
	]

	const activityData = [
		//should be filter down by competition ID
		{
			UserActivityID: 1,
			CompetitionID: 1,
			UserInput: "Run 5k",
			TotalTime: 30,
			TotalPoints: 10,
		},
		{
			UserActivityID: 2,
			CompetitionID: 1,
			UserInput: "Run 6k",
			TotalTime: 35,
			TotalPoints: 15,
		},
		{
			UserActivityID: 3,
			CompetitionID: 2,
			UserInput: "Run 6k",
			TotalTime: 35,
			TotalPoints: 15,
		}
	]	

	// Get current competition ID (this should come from your app state/context)
	const currentCompetitionId = 1;

	// Filter activity data for current competition
	const currentCompetitionActivity = activityData.filter(
		activity => activity.CompetitionID === currentCompetitionId
	);

	// Filter user milestone data for current competition
	const currentCompetitionUserMilestones = userMilestoneData.filter(
		milestone => milestone.CompetitionID === currentCompetitionId
	);

	// Filter milestone data for current competition
	const currentCompetitionMilestones = MilestoneData.filter(
		milestone => milestone.CompetitionID === currentCompetitionId
	);

	const totalMinutes = currentCompetitionActivity.reduce((acc, activity) => acc + activity.TotalTime, 0);

	// Function to get milestone image by ID
	const getMilestoneImage = (milestoneId) => {
		const milestone = MilestoneData.find(m => m.MilestoneID === milestoneId);
		return milestone ? milestone.MilestoneImage : "https://via.placeholder.com/150?text=Default";
	}

	// Function to get next milestone for current competition
	const getNextMilestone = () => {
		// Get completed milestone IDs for current competition
		const completedMilestoneIds = currentCompetitionUserMilestones.map(m => m.MilestoneID);
		
		// Find next milestone that:
		// 1. Belongs to current competition
		// 2. Hasn't been completed yet
		const nextMilestone = currentCompetitionMilestones.find(m => 
			!completedMilestoneIds.includes(m.MilestoneID)
		);
		
		return nextMilestone;
	}

	// Function to calculate progress towards next milestone
	const calculateProgress = () => {
		const nextMilestone = getNextMilestone();
		if (!nextMilestone) return null;

		const progress = (totalMinutes / nextMilestone.MilestoneTime) * 100;
		return {
			progress: Math.min(progress, 100),
			nextMilestone,
			minutesRemaining: Math.max(0, nextMilestone.MilestoneTime - totalMinutes)
		};
	}

	// Get completed milestones for current competition
	const getCompletedMilestones = () => {
		return currentCompetitionUserMilestones.filter(milestone => {
			const milestoneData = currentCompetitionMilestones.find(m => m.MilestoneID === milestone.MilestoneID);
			return milestoneData !== undefined;
		});
	}

	const progressData = calculateProgress();
	const completedMilestones = getCompletedMilestones();

	const handleChange = (e) => {
		setFormFields({ ...formFields, userInput: e.target.value })
	}
	
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formFields)
	}

	return (
		<>
			{progressData && (
				<div className="space-y-3">
					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<h3 className="text-sm font-semibold text-gray-700">Milestone {progressData.nextMilestone.MilestoneID}</h3>
								<span className="text-xs text-gray-500">({progressData.nextMilestone.MilestoneTime}m goal)</span>
							</div>
							<span className="text-xs text-gray-500">{progressData.progress.toFixed(1)}%</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div 
								className="bg-blue-500 h-2 rounded-full transition-all duration-500"
								style={{ width: `${progressData.progress}%` }}
							/>
						</div>
						<div className="mt-1 flex justify-between text-xs text-gray-500">
							<span>{totalMinutes}m</span>
							<span>{progressData.minutesRemaining}m left</span>
						</div>
					</div>

					<div className="flex items-center justify-center gap-2">
						{completedMilestones.map((milestone) => (
							<div 
								key={milestone.UserMilestoneID}
								className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
							>
								<img 
									src={getMilestoneImage(milestone.MilestoneID)} 
									alt={`Milestone ${milestone.MilestoneID}`}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
									<span className="text-white text-xs">✓</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default Milestones;
