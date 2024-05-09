"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middlewares, target, key) || [];
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middlewares, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
