"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`${key} is required`);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middlewares, target.prototype, key) ||
                [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validators, target.prototype, key) ||
                [];
            const validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        });
    };
}
exports.controller = controller;
