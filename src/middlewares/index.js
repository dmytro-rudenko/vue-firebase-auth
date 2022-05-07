import { isEmpty, isArray, isObject, values } from "lodash";

const middlewarePipeline = (context, middleware, index) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) return context.next;
  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, nextMiddleware: nextPipeline });
  };
};

const initMiddlewares = (store) => {
  return async (to, from, next) => {
    if (isEmpty(to.meta?.middleware)) {
      return next();
    }

    let middlewares = [];

    if (isArray(to.meta?.middleware)) {
      middlewares = to.meta.middleware;
    }

    if (isObject(to.meta?.middleware)) {
      middlewares = values(to.meta.middleware);
    }

    const context = { to, from, next, store };

    const nextMiddleware = middlewarePipeline(context, middlewares, 1);

    return middlewares[0]({
      ...context,
      nextMiddleware,
    });
  };
};

export { test } from "./test";
export { cronCheck } from "./cron-check";
export default initMiddlewares;
