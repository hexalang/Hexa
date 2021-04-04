@echo on
cd %~dp0
@echo Welcome to the Hexa! Support us at https://www.patreon.com/PeyTy and https://hexalang.github.io/donate/
node bootstrap.js --define debug=false hexa.json
node hexa-node.js --define debug=true --define times=false hexa.json
node hexa-node.js --define debug=false --define times=false hexa.json
@echo [[Build complete]]
:: Make icon visible
@echo off
ATTRIB +S .
