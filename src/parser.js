const tokenize = function(code) {
  const commands = code.replace(/\n\n*/g,'\n').replace(/  */g, ' ');
  return commands.split('\n').slice(0, -1);
};

const parseTokens = function(tokens) {
  return tokens.map(function(token) {
    const parsedToken = token.replace(/  */, ' ').split(' ');
    const [command, ...args] = parsedToken;
    return {command, args};
  });
};

exports.tokenize = tokenize;
exports.parseTokens = parseTokens;
