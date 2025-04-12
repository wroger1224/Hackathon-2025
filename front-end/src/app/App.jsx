import router from "./router"
import { RouterProvider } from "react-router"
import { AuthStateListener } from "../components/feature/AuthStateListener/AuthStateListener"

function App() {
  return (
		<AuthStateListener>
			<RouterProvider router={ router } />
		</AuthStateListener>
  )
}

export default App
