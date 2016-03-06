var _ = require('lodash');
var request = require('request');
var Client = require('scp2').Client;

module.exports.send = function send(link, scpOpts, destination, callback) {
    if (!link) throw new Error('Missing required parameter.  Requires http link - e.g. http://domain.com/file.txt');
    if (!scpOpts) throw new Error('Missing required parameter.  Requires sftp server options.  We need to know where to send the file.');
    if (!destination) throw new Error('Missing required parameter.  Requires destination on the SFTP server - e.g. /files/test.txt');
    if (!callback) callback = _.noop;
    request.get(link, function (err, resp, body) {
        if (err) return callback(err);
        if (!body) return callback('NO_BODY_RETURNED');
        var client = new Client(scpOpts);
        client.write({
            destination: destination,
            content: new Buffer(body)
        }, callback);
    });
}