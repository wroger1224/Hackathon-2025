export const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com" },
    { id: 5, name: "David Brown", email: "david@example.com" },
    { id: 6, name: "Emily Davis", email: "emily@example.com" },
    { id: 7, name: "Robert Wilson", email: "robert@example.com" },
    { id: 8, name: "Lisa Anderson", email: "lisa@example.com" }
];

export const mockCompetitions = [
    {
        id: 1,
        name: "2025 Move More Challenge",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isActive: true,
        teams: [
            {
                id: 1,
                name: "Team Alpha",
                captain: { id: 1, name: "John Doe" },
                members: [
                    { id: 2, name: "Jane Smith" },
                    { id: 3, name: "Mike Johnson" }
                ]
            },
            {
                id: 2,
                name: "Team Beta",
                captain: { id: 4, name: "Sarah Williams" },
                members: [
                    { id: 5, name: "David Brown" },
                    { id: 6, name: "Emily Davis" }
                ]
            },
            {
                id: 3,
                name: "Team Gamma",
                captain: { id: 7, name: "Robert Wilson" },
                members: [
                    { id: 8, name: "Lisa Anderson" }
                ]
            }
        ],
        participationStats: {
            lastWeek: {
                totalParticipants: 6,
                activeParticipants: 4,
                participationRate: 66.67,
                teamStats: [
                    { teamId: 1, activeMembers: 2, totalMembers: 3 },
                    { teamId: 2, activeMembers: 1, totalMembers: 3 },
                    { teamId: 3, activeMembers: 1, totalMembers: 1 }
                ]
            }
        }
    },
    {
        id: 2,
        name: "2024 Move More Challenge",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        isActive: false,
        teams: [],
        participationStats: {
            lastWeek: {
                totalParticipants: 0,
                activeParticipants: 0,
                participationRate: 0,
                teamStats: []
            }
        }
    }
]; 