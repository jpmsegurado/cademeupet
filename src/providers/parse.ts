import * as Parse from 'parse';
const parse = Parse;

parse.initialize('dontguessit');
parse.serverURL = 'https://cademeupet.herokuapp.com/parse';

export default parse;
