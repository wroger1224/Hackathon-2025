import React from "react";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { useSelector } from "react-redux";

const badgeList = {
	'Bronze Heart': {
		Name: "Bronze Heart",
		ID: 1,
		Image: "/assets/250-Moints-Badge-crop.png",
	},
	'Silver Heart': {	
		Name: "Silver Heart",
		ID: 2,
		Image: "/assets/500-Moints-Badge-crop.png",
	},
	'Gold Heart': {
		Name: "Gold Heart",
		ID: 3,
		Image: "/assets/750.png",
	},
	'Platinum Heart': {
		Name: "Platinum Heart",
		ID: 4,
		Image: "/assets/1000-Moints-Badge-crop.png",
	},
}

const Badges = () => {
	const profile = useSelector(state => state.userProfile);
	const community = useSelector(state => state.community);

	const { users = [] } = community || {};
	const { profile: { UserID } = {} } = profile || {};
	
	const user = users?.find(user => user?.UserID === UserID) || {};
	
	const completedMilestones = user?.completedMilestones || '';
	
	const milestoneList = completedMilestones ? completedMilestones.split(',') : [];
	
	const badges = milestoneList?.map(milestone => badgeList[milestone]) || [];

	return (
			<div className="space-y-4">
				{badges.map((badge) => (
					<div
						key={badge?.ID}
						className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
					>
						<div className="flex items-center justify-center">
							<img
								src={badge?.Image}
								alt={badge?.Name}
								className="w-auto h-12 object-contain"
							/>
						</div>
						<div className="flex-1 flex items-center justify-center">
							<h3 className="font-medium text-black text-center">{badge?.Name}</h3>
						</div>
					</div>
				))}
			</div>

	);
}

export default Badges;