# Call me as `bash build.sh`
echo [[Build started]]
cd $(dirname "$0")
node bootstrap.js hexa.json
node hexa-node.js hexa.json
node hexa-node.js hexa.json
echo [[Build complete]]
