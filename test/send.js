var client = require('../index');

describe('test', function(){
    it('send', function(done){
        var link = 'https://raw.githubusercontent.com/request/request/master/README.md';
        var scpOpts = {
            host: 'test.rebex.net',
            username: 'demo',
            password: 'password'
        };
        var destination = 'test.txt';
       client.send(link, scpOpts, destination, done);
    });
});