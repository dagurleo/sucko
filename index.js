const express = require('express');


class Sucko {

    constructor(options) {
        this.socketPort = options.port;
        if (!this.socketPort) {
            console.error('Please provide a port or a custom url for your socket server.');
            return;
        }
        this.app = express();
        this.port = 4444;
        this.app.use(express.static(__dirname + '/public'));
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', __dirname);
    }

    listen(port = null) {
        console.log(port);
        if (port) {
            this.port = port;
        }

        this.app.get('/', (req, res) => {
            res.render('index.html', { apiurl: `http://localhost:${this.socketPort}` });
        });

        this.app.listen(this.port, () => {
            console.log(`Socko server started on port ${port}`);
        });
    }
}






module.exports = Sucko;