# Call me as `bash build.sh`
echo Welcome to the Hexa! Support us at https://www.patreon.com/PeyTy and https://hexalang.github.io/donate/
cd $(dirname "$0")
node bootstrap.js hexa.json
node hexa-node.js hexa.json
node hexa-node.js hexa.json
echo [[Build complete]]
