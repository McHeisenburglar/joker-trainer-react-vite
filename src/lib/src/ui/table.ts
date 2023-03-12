console.log('hello world')

function htmlToElement2(html: string): Node {
	var template = document.createElement('template')
	html = html.trim() // Never return a text node of whitespace as the result
	template.innerHTML = html
	return template.content.firstChild!
}
function htmlToElement(html: string): Element {
	const node = htmlToElement2(html)

	document.body.appendChild(node)
	const el = document.body.lastElementChild!
	document.body.removeChild(node)

	return el
}

const nameCell = (name: string) => {
	const template = `<th class="name-header">${name}</th>`
	const el = htmlToElement(template)
	return el
}

const nameRow = (names: string[]) => {
	const template = `
        <tr class="row header-row name-row">
            <th></th>
        </tr>
    `
	const row = htmlToElement(template)
	names.forEach((name) => {
		row.appendChild(nameCell(name))
	})

	const header = htmlToElement('<thead></thead>')
	header.appendChild(row)

	return header
}

const scoreTableCell = (bet: number) => {
	const score = scoreForBet(bet)
	const betLabel = bet || '–'
	const template = `
        <td class="cell score-cell">
            <span class="cell-bet-number" data-bet="${bet}">${betLabel}</span>
            <span class="cell-score-number" data-score="${score}">${score}</span>
        </td>
    `
	const el = htmlToElement(template)
	return el
}

const scoreForBet = (bet: number) => bet * 50 + 50

const roundNumberCell = (roundNumber: number) => {
	const template = `
        <th class="row-header round-number">
           <span class="cell-round-number" data-round="${roundNumber}">${roundNumber}</span>
        </th>
    `
	const el = htmlToElement(template)
	return el
}

const roundRow = (roundNumber: number, scores: number[]) => {
	const template = `<tr class="row round-row" data-round="${roundNumber}"></tr>`
	const row = htmlToElement(template)
	row.appendChild(roundNumberCell(roundNumber))
	scores.forEach((bet) => {
		row.appendChild(scoreTableCell(bet))
	})
	return row
}

const setBlock = (setNumber: number, rounds: number[]) => {
	const template = `
        <tbody
            class="section set-section"
            data-set="${setNumber}">
        </tbody>`
	const block = htmlToElement(template)

	let totals = [0, 0, 0, 0]

	rounds.forEach((round) => {
		const bets = [0, 1, round - 1, round]
		totals = totals.map((total, index) => total + scoreForBet(bets[index]))
		const row = roundRow(round, [0, 1, round - 1, round])
		block.appendChild(row)
	})

	block.appendChild(setScoreRow(setNumber, totals))

	block.addEventListener('click', (e) => {
		e.preventDefault()
		block.classList.toggle('block-hidden')
	})

	return block
}

const setTotalCell = (total: number) => {
	const template = `
        <th class="row-header set-total">
            <span class="cell-bet-number"></span>
            <span class="cell-score-number cell-set-total" data-set-total="${total}">${total}</span>
        </th>
    `
	const el = htmlToElement(template)
	return el
}

const setScoreRow = (setNumber: number, totals: number[]) => {
	const template = `
		<tr class="row header-row set-score-row" data-set="${setNumber}">
			<th class="row-header set-number">
				<span class="cell-set-number" data-round="${setNumber}">${setNumber}</span>
			</th>
		</tr>
    `
	const row = htmlToElement(template)
	totals.forEach((total) => {
		row.appendChild(setTotalCell(total))
	})

	const footer = htmlToElement('<tfoot></tfoot>')
	footer.appendChild(row)

	return footer
}

const gameTable = (roundArrays: number[][], names: string[]) => {
	const template = `<table class="score-table"></table>`
	const table = htmlToElement(template)

	table.appendChild(nameRow(names))

	roundArrays.forEach((set, index) => {
		table.appendChild(setBlock(index, set))
	})

	return table
}

const rounds = [
	[1, 2, 3, 4, 5, 6, 7, 8],
	[9, 9, 9, 9],
	[8, 7, 6, 5, 4, 3, 2, 1],
	[9, 9, 9, 9],
]

const names = ['Irakli', 'Dea', 'Shio', 'Mari']
const table = gameTable(rounds, names)

const mountTo = document.getElementById('table-mount')!

mountTo.appendChild(table)
