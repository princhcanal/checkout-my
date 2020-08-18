"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
var envalid_1 = require("envalid");
exports.validateEnv = function () {
    envalid_1.cleanEnv(process.env, {
        MONGO_PASSWORD: envalid_1.str(),
        MONGO_USER: envalid_1.str(),
        MONGO_DB_NAME: envalid_1.str(),
        MONGO_URI: envalid_1.str(),
    });
};
//# sourceMappingURL=validateEnv.js.map