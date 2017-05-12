/**
 * Created by lugy on 2017/5/12.
 */
var Promise=require("bulebird"),
    fs=Promise.promisifyAll(require('fs-extra'));

var root=__dirname.replace(/xtp-cli\/lib/,'xtp-cli/');
function generateProject(project) {
    return fs.copyAsync(root+'templates',project)
        .then(function (err) {
            return err?console.error(err):console.log('generate project success');
        })
}
module.exports=generateProject;