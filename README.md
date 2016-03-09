# url-to-sftp

A library for transferring files from an http link to an SFTP server.  

-----

## Install

    $ npm install url-to-sftp

## Example

```js
    var client = require('url-to-sftp');
    var scpOpts = {
                      host: 'test.rebex.net',
                      username: 'demo',
                      password: 'XXXXXX' //you can also use `privateKey` with a key file and omit password
                      path: ''
                  }
    var link = 'https://raw.githubusercontent.com/request/request/master/README.md';
    var destination = '/public/test.txt';
    client.send(link, scpOpts, destination, function(err, resp){
          err ? console.error(err) : console.log('completed transfer');  
    });
```
Transfer an http file to SFTP
