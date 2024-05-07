import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middlewares, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middlewares,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
