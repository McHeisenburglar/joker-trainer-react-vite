import React, { ReactNode } from 'react'

interface ChildrenProps {
	children: ReactNode
}

const DevWindow: React.FC<ChildrenProps> = ({ children }) => {
	return <div className="dev-window">{children}</div>
}

export default DevWindow
