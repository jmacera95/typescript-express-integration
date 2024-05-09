"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const MetadataKeys_1 = require("./MetadataKeys");
function bodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validators, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
