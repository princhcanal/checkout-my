import App from './app';
import 'dotenv/config';
import mongoose from 'mongoose';
import { validateEnv } from './utils/validateEnv';
import PostController from './controllers/post.controller';
import AuthController from './controllers/auth.controller';
import User from './interfaces/user.interface';

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

validateEnv();

const port = parseInt(process.env.PORT as string) || 5000;

const app = new App([new PostController(), new AuthController()], port);

app.listen();
