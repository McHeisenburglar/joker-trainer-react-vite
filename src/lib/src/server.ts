import http from 'http'
import fs from 'fs'

const PORT = 5500

fs.readFile('./card.html', function (err, html) {
	if (err) throw err

	http
		.createServer(function (request, response) {
			response.writeHead(200, { 'Content-Type': 'text/html' })
			response.write(html)
			response.end()
		})
		.listen(PORT)
})
