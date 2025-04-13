import { useState } from "react";

const ActivityTracker = () => {
	const [input, setInput] = useState("");
	const [showInput, setShowInput] = useState(false);
	const [showButton, setShowButton] = useState(true);
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
			UserActivityID: 2,
			CompetitionID: 2,
			UserInput: "Run 6k",
			TotalTime: 35,
			TotalPoints: 15,
		}
	]	
	const handleButtonClick = (time) => {
		setShowInput(!showInput);
		setInput(time);
	}

	return (
		<div>
			{
				activityData.map((activity) => {
					const {UserActivityID, CompetitionID, UserInput, TotalTime, TotalPoints} = activity;

					return (
						<div key={UserActivityID}>
							<h1>{UserInput}</h1>
							<p>{TotalPoints}</p>
							{
								showInput ? <Input type="text" value={input} onChange={(e) => setInput(e.target.value)} /> : TotalTime
							}
							<Button onClick={() => setShowInput(true)}>Edit</Button>
						</div>
					);
				})
			}
		</div>
	)
}

