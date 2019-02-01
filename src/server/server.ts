import express = require('express');
import { router } from '../router/router';

export default class Server {

    app: express.Application;
    port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number): Server {
        return new Server(port);
    }

    public start(callback: Function): void {
        this.app.listen(this.port, callback);
        this.app.use(router);
    }
}
