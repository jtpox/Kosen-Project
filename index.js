import Express from 'express';

import dotenv from 'dotenv';

import Kosen from './app/kosen';

dotenv.config();

const kosen = new Kosen(Express);
