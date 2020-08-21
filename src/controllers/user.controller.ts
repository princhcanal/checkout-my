import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import postModel from '../models/post.model';
import authMiddleware from '../middleware/auth.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';

// TODO: implement subscription service for each user for discounts on products
class UserController implements Controller {
	public path = '/user';
	public router = express.Router();
	private user = userModel;
	private post = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:username`, this.getUserProfile);
		this.router.get(`${this.path}/:username/following`, this.getFollowing);
		this.router.get(`${this.path}/:username/posts`, this.getUserPosts);

		this.router
			.all(`${this.path}*`, authMiddleware)
			.patch(`${this.path}`, this.updateUser)
			.post(`${this.path}/:username/follow`, this.followUser)
			.post(`${this.path}/:username/subscribe`, this.subscribeUser);
	}

	private getUserProfile = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user.findOne({ username });

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const posts = await this.post.find({ author: user._id });

			const message = `User ${username} fetched successfully`;
			user.password = '';
			res.status(200).json({ message, user, posts });
		} catch (err) {
			next(err);
		}
	};

	private followUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let followingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);
			let message = `User ${username} followed successfully`;

			if (!followingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (!followingUser.followers.includes(user._id)) {
				followingUser.followers.push(user._id);
			} else {
				message = `User ${username} already followed`;
				return res.status(200).json({ message });
			}

			if (!user.following.includes(followingUser._id)) {
				user.following.push(followingUser._id);
				await user.save();
			}

			followingUser = await followingUser.save();
			await followingUser
				.populate('followers', 'username')
				.execPopulate();
			const numFollowers = followingUser.followers.length;

			res.status(200).json({ message, numFollowers });
		} catch (err) {
			next(err);
		}
	};

	private subscribeUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let subscribingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);
			let message = `User ${username} subscribed successfully`;

			if (!subscribingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (!subscribingUser.subscribers.includes(user._id)) {
				subscribingUser.subscribers.push(user._id);
			} else {
				message = `User ${username} already subscribed`;
				return res.status(200).json({ message });
			}

			if (!user.subscriptions.includes(subscribingUser._id)) {
				user.subscriptions.push(subscribingUser._id);
				await user.save();
			}

			subscribingUser = await subscribingUser.save();
			await subscribingUser
				.populate('subscribers', 'username')
				.execPopulate();

			res.status(200).json({ message });
		} catch (err) {
			next(err);
		}
	};

	private getUserPosts = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user.findOne({ username });

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const posts = await this.post.find({ author: user._id });
			const message = 'Posts fetched successfully';
			res.status(200).json({ message, posts });
		} catch (err) {
			next(err);
		}
	};

	private updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userData = req.body;
			const user = await this.user.findByIdAndUpdate(
				req.user._id,
				userData,
				{ new: true }
			);
			const message = 'User updated successfully';

			res.status(200).json({ message, user });
		} catch (err) {
			next(err);
		}
	};

	private getFollowing = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user.findOne({ username });

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const followingUsers = await this.user
				.find({
					followers: user._id,
				})
				.select('username');
			const following = followingUsers.map((f) => {
				return {
					_id: f._id,
					username: f.username,
					url: `${process.env.BASE_URL}/user/${f.username}`,
				};
			});

			const message = 'Following fetched successfully';
			res.status(200).json({
				message,
				following,
			});
		} catch (err) {
			next(err);
		}
	};
}

export default UserController;
