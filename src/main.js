const fs = require('fs');
const {tokenize, parseTokens} = require('./parser.js');
const {run} = require('./interpreter.js');
const {display} = require('../lib/utils.js');

const main = function() {
  const filePath = process.argv[2];
  if(!fs.existsSync(filePath)){
    console.error(`${filePath} doesn't exits`);
    process.exit(1);
  }
  const code = fs.readFileSync(filePath, 'utf-8');
  const tokens = tokenize(code);
  const instructions = parseTokens(tokens);
  const output = run(instructions);
  display(output);
};

main();
