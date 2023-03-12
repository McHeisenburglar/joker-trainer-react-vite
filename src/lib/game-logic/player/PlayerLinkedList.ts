import { Card } from '../card/CardDeck.js'
import { UICard } from '../card/CardNames.js'

export class LLNode<T> {
	public data: T
	public next: LLNode<T> | null = null
	public prev: LLNode<T> | null = null
	constructor(data: T) {
		this.data = data
	}
}

export class LinkedList<T> {
	public head: LLNode<T> | null = null
	public current: LLNode<T> | null = null
	public tail: LLNode<T> | null = null

	public createNode(data: T): LLNode<T> {
		return new LLNode(data)
	}

	public insertNode(node: LLNode<T>): void {
		if (!this.head || !this.tail) {
			this.head = node
			this.head.next = node
			this.head.prev = node
			this.tail = node
			this.tail.next = node
			this.tail.next = node
		} else {
			this.tail.next = node
			node.prev = this.tail
			this.tail = node

			node.next = this.head
			this.head.prev = node
		}
	}

	public insert(data: T) {
		const node = this.createNode(data)
		this.insertNode(node)
	}

	public forEach(callback: (node: LLNode<T>, index?: number) => void) {
		if (!this.head || !this.tail) return

		let current = this.head
		let index = 0
		while (true) {
			callback(current, index)
			current = current.next!
			index++
			if (current === this.head) break
		}
	}

	public insertAtIndex(data: T, index: number): void {
		const oldNode = this.atIndex(index)
		const newNode = this.createNode(data)
		this.insertBefore(newNode, oldNode)
		return
	}

	public insertBefore(newNode: LLNode<T>, node: LLNode<T>): void {
		newNode.prev = node.prev
		node.prev!.next = newNode

		newNode.next = node
		node.prev = newNode

		if (this.head === node) {
			this.head = newNode
		}
	}
	public insertAfter(newNode: LLNode<T>, node: LLNode<T>): void {
		newNode.next = node.next
		node.next!.prev = newNode

		node.next = newNode
		newNode.prev = node

		if ((this.tail = node)) {
			this.tail = newNode
		}
	}

	public remove(node: LLNode<T>) {
		if (!node.prev || !node.next) throw new Error('Node not connected in list.')

		if (this.head === this.tail) {
			this.head = null
			this.tail = null
		}
		node.prev.next = node.next
		node.next.prev = node.prev
		if (node === this.head && node === this.tail) this.clear()
		if (node === this.head) this.head = node.next
		if (node === this.tail) this.tail = node.prev
	}

	public removeAtIndex(index: number): void {
		const node = this.atIndex(index)
		this.remove(node)
	}

	public atIndex(index: number): LLNode<T> {
		if (index < 0 || index >= this.size) throw new Error('Index out of range')
		if (!this.head) throw new Error('List empty')

		let current = this.head
		for (let i = 0; i < index; i++) {
			if (current.next) {
				current = current.next
			}
		}
		return current
	}
	public getAll(): LLNode<T>[] {
		const list: LLNode<T>[] = []
		this.forEach((n) => {
			list.push(n)
		})
		return list
	}
	public printList(): void {
		const str = this.getAll()
			.map((n) => n.data)
			.join(' -> ')
		console.log(str)
	}

	public clear(): void {
		this.head = null
		this.current = null
		this.tail = null
	}

	public get size(): number {
		let index = 0
		this.forEach(() => {
			index++
		})
		return index
	}

	public moveNext(): void {
		if (this.current) {
			this.current = this.current.next
		}
	}
	public movePrev(): void {
		if (this.current) {
			this.current = this.current.prev
		}
	}
	public resetCurrent(): void {
		this.current = this.head
	}
}

export class PlayerLL extends LinkedList<PlayerInfo> {
	constructor() {
		super()
	}
	public printNames(): void {
		const str = this.getAll()
			.map((n) => n.data.name)
			.join(' -> ')
		console.log(str)
	}
	public generateFromList(arr: PlayerInfo[]) {
		arr.forEach((player) => {
			this.insert(player)
		})
	}
}

type JokerKickerAction = {
	type: 'wantHighest' | 'goesToHighest'
	suit: Suit
}

type JokerFollowAction = {
	type: 'over' | 'under'
}

type JokerAction = JokerKickerAction | JokerFollowAction
type PlayedCard = {
	card: Card
	jokerAction?: JokerAction
}

type TableSlot = PlayedCard | null

export class TurnTable extends LinkedList<TableSlot> {
	constructor() {
		super()
		this.reset()
	}
	reset(): void {
		this.clear()
		this.insert(null)
		this.insert(null)
		this.insert(null)
		this.insert(null)
		this.resetCurrent()
	}
	playCard(card: PlayedCard) {
		if (!this.current) throw new Error('Not in play.')
		this.current.data = { ...card }
	}
	printTable(): void {
		const arr: string[] = []
		this.forEach((c) => {
			let str = ''
			if (c.data) {
				const card = c.data.card
				if (card.type === 'regular') {
					const name = new UICard(card.rank, card.suit)
					str = `[ ${name.name.emoji} ]`
				} else {
					str = `[ Joker ]`
				}
			} else {
				str = `[   ]`
			}
			arr.push(str)
		})
		console.log(arr.join(' '))
	}
}
