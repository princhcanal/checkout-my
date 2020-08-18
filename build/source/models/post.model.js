"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    author: String,
    content: String,
    title: String,
});
var postModel = mongoose_1.default.model('Post', postSchema);
exports.default = postModel;
//# sourceMappingURL=post.model.js.map