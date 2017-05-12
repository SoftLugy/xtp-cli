/**
 * Created by lugy on 2017/5/12.
 */
var program=require("commander"),
    Promise=require("bluebird"),
    gs=require('../lib/generateTemplate');

program
    .version(require('../package.json').version)
    .usage('[options] [project name]')
    .parse(process.argv);

var pname=program.args[0];
if (!pname) program.help();

Promise.all([gs(pname)]).then(function () {
    console.log('project created');
})