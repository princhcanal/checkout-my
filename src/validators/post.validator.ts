import { body } from 'express-validator';

const postValidator = {
	createPost: [
		body('content')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Content cannot be empty'),
		body('title')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Title cannot be empty'),
	],
	updatePost: [
		body('author').trim().optional(),
		body('content').trim().optional(),
		body('title').trim().optional(),
	],
};

export default postValidator;
