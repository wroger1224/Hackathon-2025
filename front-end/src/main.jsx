import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store'
import { Provider } from 'react-redux'
import App from './app/App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<Provider store={store}>
				<App />
		</Provider>
  </StrictMode>,
)
