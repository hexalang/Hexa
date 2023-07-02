const fs = require("fs")

let today = new Date()
let month = today.getMonth() + 1
let versionName = today.getFullYear() + '.' + month + '.' + today.getDate()

{
	const path = 'hexa.json'
	let file = fs.readFileSync(path).toString()

	file = file
		.split('\r\n')
		.map(line => {
			if (line.includes('"version"')) {
				return '\t"version": "' + versionName + '",'
			}

			return line
		})
		.join('\r\n')

	fs.writeFileSync(path, file)
}

{
	const path = 'tools/innoSetup/installHexa.iss'
	let file = fs.readFileSync(path).toString()

	file = file.replaceAll('2023.01.01', versionName)

	fs.writeFileSync(path, file)
}
