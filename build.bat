@echo on
cd %~dp0
@echo [[Build started]]
node bootstrap.js --define entry=false hexa.json
node hexa-node.js --define entry=false --define debug=true --define times=true hexa.json
node hexa-node.js --define entry=false --define debug=false --define times=true hexa.json
@echo [[Build complete]]
