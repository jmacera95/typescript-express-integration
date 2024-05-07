"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.router = void 0;
const express_1 = require("express");
require("reflect-metadata");
exports.router = (0, express_1.Router)();
function controller(routePrefix) {
    return function (target) {
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
            if (path) {
                exports.router.get(`${routePrefix}${path}`, routeHandler);
            }
        });
    };
}
exports.controller = controller;
