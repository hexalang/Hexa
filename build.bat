@echo on
cd %~dp0
echo [[Build started]]
node bootstrap.js hexa.json
node hexa-node.js hexa.json
node hexa-node.js hexa.json
echo [[Build complete]]
