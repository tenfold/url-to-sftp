var _ = require('lodash');
var request = require('request');
var Client = require('scp2').Client;
var progress = require('progress-stream');

module.exports.send = function send(link, scpOpts, destination, callback) {
    if (!link) throw new Error('Missing required parameter.  Requires http link - e.g. http://domain.com/file.txt');
    if (!scpOpts) throw new Error('Missing required parameter.  Requires sftp server options.  We need to know where to send the file.');
    if (!destination) throw new Error('Missing required parameter.  Requires destination on the SFTP server - e.g. /files/test.txt');
    if (!callback) callback = _.noop;
    request.head(link, function (err, resp, body) {
        if(err) return callback(err);
        var contentLength = resp.headers['content-length'];
        var client = new Client(scpOpts);
        //todo make the time setting configurable
        var progressStr = progress({time: 5000, length: contentLength}, function (progress) {
            //todo allow a custom logger from opts
            console.log(destination, 'transferred:', progress.transferred, 'remaining:', progress.remaining);
        });

        client.writeStream(destination, function getWriteableStream(err, writeableStream) {
            if(err) return callback(err);
            request(link).pipe(progressStr).pipe(writeableStream);
        }, callback);
    })
}
