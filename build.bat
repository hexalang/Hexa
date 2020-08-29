@echo on
cd %~dp0
node bootstrap.js hexa.json
node hexa-node.js hexa.json
node hexa-node.js hexa.json
