import './scss/main.scss'

import { Card } from './components/Card'

function App() {
	return (
		<div className="main">
			<div className="card-display">
				<Card rank="7" suit="spades" />
			</div>
		</div>
	)
}

export default App
