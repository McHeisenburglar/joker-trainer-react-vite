import React from 'react'

interface HiddenCardProps {
	onClick?: () => void
}

const HiddenCard: React.FC<HiddenCardProps> = ({ onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return <div className="card hidden" onClick={handleClick} />
}

export default HiddenCard
