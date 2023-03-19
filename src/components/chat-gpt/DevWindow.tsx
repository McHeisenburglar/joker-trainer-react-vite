import React, { ReactNode } from 'react'

interface ChildrenProps {
	position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
	children: ReactNode
}

const DevWindow: React.FC<ChildrenProps> = ({ position, children }) => {
	return <div className={`dev-window ${position}`}>{children}</div>
}

export default DevWindow
