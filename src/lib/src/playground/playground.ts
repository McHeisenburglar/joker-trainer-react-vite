import { PlayerLL } from '../game-logic/player/PlayerLinkedList.js'
import { LinkedList, TurnTable } from '../game-logic/player/PlayerLinkedList.js'

const playerList = new PlayerLL()

const list: LinkedList<number> = new LinkedList()

// playerList.add('irakli')
// playerList.add('dea')
// playerList.add('shio')
// playerList.add('mari')

// playerList.printNames()

list.insert(2)
// list.insert(49)
console.log(list.head)

const table = new TurnTable()
