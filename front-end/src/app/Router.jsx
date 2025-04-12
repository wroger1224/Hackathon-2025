import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from '../components/common/Layout/Layout';

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
					}
				]
			},
		]
	},
	{
		path: "/auth",
		element: <Auth />
	}
]);

export default router;