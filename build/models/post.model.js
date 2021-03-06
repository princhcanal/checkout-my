"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    imagePath: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    url: { type: String, required: true },
}, { timestamps: true });
var postModel = mongoose_1.default.model('Post', postSchema);
exports.default = postModel;
//# sourceMappingURL=post.model.js.map