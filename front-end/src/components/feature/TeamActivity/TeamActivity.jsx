import { useSelector } from 'react-redux';

const TeamActivity = () => {
	const team = [
		{
			name: "Joe Shmoe",
			totalMinutes: 100,
		},
		{
			name: "Sally Shmoe",
			totalMinutes: 90,
		},
		{
			name: "John Shmoe",
			totalMinutes: 80,
		},
	]

	return (
		<table className="min-w-full divide-y">
			<thead>
				<tr>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
						Rank
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
						Name
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
						Total Minutes
					</th>
				</tr>
			</thead>
			<tbody className="divide-y">
				{team.map((member, index) => (
					<tr 
						key={member.name}
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
							<div className="text-sm font-medium">{member.name}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap">
							<div className="text-sm">{member.totalMinutes}</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TeamActivity;
