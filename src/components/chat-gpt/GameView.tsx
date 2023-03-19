import { useMemo, useState } from 'react'
import { getRandomCards, getRandomCardTable } from '../../lib/helpers/random'
import Card from './Card'
import CardTable from './CardTable'
import DevWindow from './DevTable'
import HiddenHand from './HiddenHand'

const GameView = () => {
	const hand = useMemo(() => getRandomCards(10), [])
	const table = useMemo(() => getRandomCardTable(), [])
	const playedCard = useMemo(() => getRandomCards(1)[0], [])

	const [components, setComponents] = useState({
		cardHand: true,
		cardTable: true,
		hiddenHand: false,
	})

	const toggleComponent = (component: string | number) => {
		setComponents((prev) => ({ ...prev, [component]: !prev[component] }))
	}
	return (
		<div className="game-view">
			<Card card={playedCard}></Card>
			{components.cardTable && <CardTable cards={table} />}
			{components.hiddenHand && <HiddenHand position="top" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="left" numCards={5} />}
			{components.hiddenHand && <HiddenHand position="right" numCards={5} />}
			{/* {components.cardHand && (
				<CardHand cards={hand} trumpSuit={'spades'} playedCard={playedCard} />
			)} */}
			<DevWindow components={components} toggleComponent={toggleComponent} />
		</div>
	)
}

export default GameView
