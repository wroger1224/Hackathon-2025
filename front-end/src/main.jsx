import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/UserContext'
import App from './app/App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
  </StrictMode>,
)
