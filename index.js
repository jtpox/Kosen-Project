import Express from 'express';

import Ws from 'ws';

import dotenv from 'dotenv';

import Kosen from './app/kosen';

import Websocket from './app/websocket';

dotenv.config();

const kosen = new Kosen(Express); // Start Web Server.

const websocket = new Websocket(Ws); // Start Web Socket.
