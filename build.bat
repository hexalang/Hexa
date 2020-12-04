@echo on
cd %~dp0
@echo [[Build started]]
node bootstrap.js --define debug=false hexa.json
node hexa-node.js --define debug=true --define times=false hexa.json
node hexa-node.js --define debug=false --define times=false hexa.json
@echo [[Build complete]]
