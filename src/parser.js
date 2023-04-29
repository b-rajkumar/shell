const tokenize = function(code) {
  const lines = code.replace(/\n\n*/g,'\n').replace(/  */g, ' ');
  return lines.split('\n').slice(0, -1);
};

const parseTokens = function(tokens) {
  return tokens.map(function(token) {
    const [command,...args] = token.replace(/  */, ' ').split(' ');
    return {command, args};
  });
};

exports.tokenize = tokenize;
exports.parseTokens = parseTokens;
