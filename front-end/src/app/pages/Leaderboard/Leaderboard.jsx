import { useSelector } from 'react-redux';

const Leaderboard = () => {
	const teams = [
		{
			name: "Team 1",
			totalMinutes: 100,		
		},
		{
			name: "Team 2",
			totalMinutes: 90
		}
	]

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">Activity Leaderboard</h1>
			
			<div className="shadow-lg rounded-lg overflow-hidden">
				<table className="min-w-full divide-y">
					<thead>
						<tr>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
								Rank
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
								Team Name
							</th>
							<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
								Total Minutes
							</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{teams.map((team, index) => (
							<tr 
								key={team.name}
								className="hover:bg-gray-50"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<span className="flex items-center justify-center w-8 h-8 rounded-full border">
											<span className="text-sm font-medium">{index + 1}</span>
										</span>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium">{team.name}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm">{team.totalMinutes}</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Leaderboard;
