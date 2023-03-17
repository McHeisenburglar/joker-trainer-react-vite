interface DevWindowProps {
	components: {
		cardHand: boolean
		cardTable: boolean
		hiddenHand: boolean
	}
	toggleComponent: (component: string) => void
}

// want the same component, but with const React.FC

const DevWindow: React.FC<DevWindowProps> = (props) => {
	const { components, toggleComponent } = props

	return (
		<div className="dev-window">
			<h2>Dev Window</h2>
			<div className="dev-toggle">
				<input
					type="checkbox"
					checked={components.cardHand}
					onChange={() => toggleComponent('cardHand')}
				/>
				<label>Card Hand</label>
			</div>
			<div className="dev-toggle">
				<input
					type="checkbox"
					checked={components.cardTable}
					onChange={() => toggleComponent('cardTable')}
				/>
				<label>Card Table</label>
			</div>
			<div className="dev-toggle">
				<input
					type="checkbox"
					checked={components.hiddenHand}
					onChange={() => toggleComponent('hiddenHand')}
				/>
				<label>Hidden Hand</label>
			</div>
		</div>
	)
}

export default DevWindow
