const express = require('express');


class Sucko {

    constructor(options) {
        this.socketPort = options.port;
        this.app = express();
        this.port = 4444;
        this.app.use(express.static(__dirname + '/public'));
        // this.app.engine('html', require('ejs').renderFile);
        // this.app.set('view engine', 'html');
        // this.app.set('views', __dirname);
    }

    listen(port = null) {
        if (port) {
            this.port = port;
        }
        console.log(`Listening to socket server on port ${this.socketPort}`);

        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
            
        });

        this.app.get('/socketurl', (req, res) => {
            res.json({socketPort: this.socketPort});
        })

        this.app.listen(this.port, () => {
            console.log(`Socko server started on port ${port}`);
        });
    }
}






module.exports = Sucko;