import { determineWinner } from './DetermineWinner'

describe('determineWinner', () => {
	describe('no trumps', () => {
		it('test 1', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'clubs', rank: '8' },
				{ type: 'regular', suit: 'clubs', rank: '9' },
			] as Card[]
			expect(determineWinner(cards)).toBe(3)
		})
		it('test 2', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '9' },
				{ type: 'regular', suit: 'clubs', rank: '8' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'clubs', rank: '6' },
			] as Card[]
			expect(determineWinner(cards)).toBe(0)
		})
		it('test 3', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '8' },
				{ type: 'regular', suit: 'clubs', rank: '9' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'clubs', rank: '6' },
			] as Card[]
			expect(determineWinner(cards)).toBe(1)
		})
		it('test 4', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: 'jack' },
				{ type: 'regular', suit: 'clubs', rank: 'queen' },
				{ type: 'regular', suit: 'clubs', rank: 'ace' },
				{ type: 'regular', suit: 'clubs', rank: 'king' },
			] as Card[]
			expect(determineWinner(cards)).toBe(2)
		})
		it('ignores other suits', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: 'jack' },
				{ type: 'regular', suit: 'hearts', rank: 'queen' },
				{ type: 'regular', suit: 'spades', rank: 'ace' },
				{ type: 'regular', suit: 'diamonds', rank: 'king' },
			] as Card[]
			expect(determineWinner(cards)).toBe(0)
		})
		it('only accepts clubs', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: 'jack' },
				{ type: 'regular', suit: 'spades', rank: 'ace' },
				{ type: 'regular', suit: 'clubs', rank: 'queen' },
				{ type: 'regular', suit: 'spades', rank: 'king' },
			] as Card[]
			expect(determineWinner(cards)).toBe(2)
		})
	})
	describe('has trumps', () => {
		it('trump wins', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
				{ type: 'regular', suit: 'clubs', rank: '9' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(2)
		})
		it('highest trump wins', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
				{ type: 'regular', suit: 'diamonds', rank: '9' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(3)
		})
		it('highest trump wins 2', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'diamonds', rank: '9' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(1)
		})
	})
	describe('has joker', () => {
		it('joker wins', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
			] as Card[]
			expect(determineWinner(cards)).toBe(3)
		})
		it('joker wins 2', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
			] as Card[]
			expect(determineWinner(cards)).toBe(2)
		})
		it('joker wins over trump', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(2)
		})
		it('joker wins when first', () => {
			const cards = [
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'regular', suit: 'diamonds', rank: '8' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(0)
		})
	})
	describe('has two jokers', () => {
		it('second joker wins', () => {
			const cards = [
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
			] as Card[]
			expect(determineWinner(cards)).toBe(3)
		})
		it('second joker wins 2', () => {
			const cards = [
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'regular', suit: 'clubs', rank: '6' },
				{ type: 'joker', suit: 'joker', rank: 'joker' },
				{ type: 'regular', suit: 'clubs', rank: '7' },
			] as Card[]
			expect(determineWinner(cards, 'diamonds')).toBe(2)
		})
	})
})
