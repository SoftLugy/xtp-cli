/**
 * Created by lugy on 2017/5/12.
 */
var Promise=require("bluebird"),
    fs=Promise.promisifyAll(require('fs-extra'));

var root=__dirname.replace('lib','');
console.log(root);
function generateProject(project) {
    return fs.copyAsync(root+'\\templates',project)
        .then(function (err) {
            return err?console.error(err):console.log('generate project success');
        })
}
module.exports=generateProject;