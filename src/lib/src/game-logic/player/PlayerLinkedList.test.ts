import { LinkedList, PlayerLL } from './PlayerLinkedList.js'

describe('testing Jest', () => {
	it('works', () => {
		expect(true).toBeTruthy()
	})
})

describe('LinkedList', () => {
	let list: LinkedList<number>

	beforeAll(() => {
		list = new LinkedList()
	})

	describe('empty list', () => {
		describe('insert node', () => {
			beforeEach(() => {
				list.clear()
			})
			afterAll(() => {
				list.clear()
			})
			it('insert 1. head and tail are same.', () => {
				list.insert(123)
				expect(list.head!.data).toEqual(123)
				expect(list.tail!.data).toEqual(123)
			})
			it('insert 2. they point to each other.', () => {
				list.insert(69)
				list.insert(420)
				expect(list.head!.next!.data).toEqual(420)
				expect(list.tail!.next!.data).toEqual(69)
			})
		})
	})

	describe('filled list', () => {
		beforeEach(() => {
			list.insert(0)
			list.insert(1)
			list.insert(2)
			list.insert(3)
			list.insert(4)
		})

		afterEach(() => {
			list.clear()
		})

		describe('get size', () => {
			it('returns 3', () => {
				expect(list.size).toEqual(5)
			})
			it('returns 0', () => {
				list.clear()
				expect(list.size).toEqual(0)
			})
		})

		describe('look up at index', () => {
			it('correctly looks up nodes', () => {
				expect(list.atIndex(0).data).toEqual(0)
				expect(list.atIndex(1).data).toEqual(1)
			})
			it('throws an error for number too high', () => {
				expect(() => {
					list.atIndex(55)
				}).toThrow()
			})
			it('throws an error for invalid number', () => {
				expect(() => {
					list.atIndex(-213)
				}).toThrow()
			})
		})
		describe('insert at index', () => {
			const val = 50
			it('insert at index 3', () => {
				list.insertAtIndex(val, 3)
				expect(list.atIndex(3).data).toEqual(val)
			})
			it('insert at index 0 replaces head', () => {
				list.insertAtIndex(val, 3)
				expect(list.atIndex(3).data).toEqual(val)
			})
			it('insert at index 4, tail moves over', () => {
				list.insertAtIndex(val, 4)
				expect(list.atIndex(5).data).toEqual(4)
				expect(list.tail!.data).toEqual(4)
			})
			it('throws an error out of range', () => {
				expect(() => {
					list.insertAtIndex(50, 55)
				}).toThrow()
			})
		})
		describe('forEach loop', () => {
			it('correctly loops 5 times', () => {
				let i = 0
				list.forEach(() => i++)
				expect(i).toEqual(5)
			})
			it('correctly loops 0 times', () => {
				list.clear()
				let i = 0
				list.forEach(() => i++)
				expect(i).toEqual(0)
			})
		})
		describe('remove node', () => {
			it('removes at index 3', () => {
				const index = 3
				const node = list.atIndex(index)
				const oldVal = node.data
				list.remove(node)
				expect(list.size).toEqual(4)
				expect(list.atIndex(index).data).not.toEqual(oldVal)
			})
			it('removes head. head moves over', () => {
				const node = list.head
				list.remove(node!)
				expect(list.size).toEqual(4)
				expect(list.head!.data).toEqual(1)
			})
			it('removes tail, tail moves over', () => {
				const node = list.tail
				list.remove(node!)
				expect(list.size).toEqual(4)
				expect(list.tail!.data).toEqual(3)
			})
			it('clears list if end of list', () => {
				list.remove(list.head!)
				list.remove(list.head!)
				list.remove(list.head!)
				list.remove(list.head!)
				list.remove(list.head!)
				expect(list.head).toEqual(null)
				expect(list.tail).toEqual(null)
			})
		})
		describe('remove at index', () => {
			it('removes items at index 0', () => {
				list.removeAtIndex(0)
				list.removeAtIndex(0)
				list.removeAtIndex(0)
				expect(list.size).toEqual(2)
			})
			it('removes item at index 2', () => {
				list.removeAtIndex(2)
				expect(list.getAll()).not.toContain(2)
			})
		})
		describe('get all', () => {
			it('gets an array of correct size', () => {
				const arr = list.getAll()
				expect(arr.length).toEqual(5)
			})
			it('returns an empty array for list array', () => {
				list.clear()
				const arr = list.getAll()
				expect(arr.length).toEqual(0)
			})
		})
		describe('prev/next movement', () => {
			it('loops from tail to head', () => {
				expect(list.tail!.next).toEqual(list.head)
			})
			it('loops from head to tail', () => {
				expect(list.head!.prev).toEqual(list.tail)
			})
			it('loops from one node to another', () => {
				expect(list.atIndex(0).next).toEqual(list.atIndex(1))
			})
		})
		describe('tracking current node', () => {
			beforeEach(() => {
				list.current = list.head
			})
			it('starts current at head', () => {
				expect(list.head).toEqual(list.current)
			})
			it('moves current to next', () => {
				list.moveNext()
				expect(list.atIndex(1)).toEqual(list.current)
			})
			it('moves current to next', () => {
				list.moveNext()
				expect(list.atIndex(1)).toEqual(list.current)
			})
		})
	})
})

describe('PlayerLinkedList', () => {
	const names = ['irakli', 'dea', 'shio', 'mari']
	const list = new PlayerLL()
	describe('insert', () => {
		beforeEach(() => {
			list.clear()
		})
		it('accepts PlayerInfo objects', () => {
			list.insert({ name: 'irakli' })
			list.insert({ name: 'dea' })
			expect(list.head!.data.name).toEqual('irakli')
			expect(list.tail!.data.name).toEqual('dea')
		})
	})
	describe('generate list', () => {
		beforeEach(() => {
			list.clear()
		})
		it('creates a linked list from arrays', () => {
			const arr = names.map((name) => ({ name }))
			list.generateFromList(arr)
			expect(list.head!.data.name).toEqual('irakli')
			expect(list.tail!.data.name).toEqual('mari')
		})
		it("doesn't create anything from an empty array", () => {
			const arr: PlayerInfo[] = []
			list.generateFromList(arr)
			expect(list.head).toEqual(null)
			expect(list.tail).toEqual(null)
		})
	})
})
