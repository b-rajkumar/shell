const fs = require('fs');
const {tokenize, parseTokens} = require('./parser.js');
const {execute} = require('./interpreter.js');

const main = function() {
  const file = process.argv[2];
  if(!fs.existsSync(file)){
    console.error(`${file} doesn't exits`);
    process.exit(1);
  }
  const code = fs.readFileSync(`./${file}`, 'utf-8');
  const tokens = tokenize(code);
  const instructions = parseTokens(tokens);
  execute(instructions);
};

main();
