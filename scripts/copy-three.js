const fs = require('fs');
const path = require('path');
const from = path.join(__dirname, '..', 'node_modules', 'three', 'build', 'three.min.js');
const toDir = path.join(__dirname, '..', 'game', 'vendor');
fs.mkdirSync(toDir, { recursive: true });
fs.copyFileSync(from, path.join(toDir, 'three.min.js'));
console.log('three.min.js copiado a game/vendor');
