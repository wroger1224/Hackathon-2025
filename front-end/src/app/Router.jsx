import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from '../components/common/Layout/Layout';
import Admin from './pages/Admin/Admin';
import CompetitionManagement from './pages/Admin/CompetitionManagement';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import Leaderboard from './pages/Leaderboard/Leaderboard';

import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{ 
				element: <Layout />, 
				children: [
					{
						index: true,
						element: <Home />
					},

					{
						path: "/admin",
						element: <Admin />
					},
					{
						path: "/admin/:competitionId",
						element: <CompetitionManagement />
					},
					{
						path: "/leaderboard",
						element: <Leaderboard />
					}
				]
			},
		]
	},
	{
		path: "/auth",
		element: <Auth />
	},
	{
		path: "/create-profile",
		element: <CreateProfile />
	},
]);

export default router;