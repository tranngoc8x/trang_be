import { RateLimit } from 'koa2-ratelimit';

export default (config, { strapi }) => {
    return async (ctx, next) => {
        const limiter = RateLimit.middleware({
            interval: config.interval || 1 * 60 * 1000,
            max: config.max || 5,
            prefixKey: `${ctx.request.path}:${ctx.request.ip}`,
            message: config.message || 'Quá nhiều yêu cầu, vui lòng thử lại sau 1 phút.',
            ...config,
        });

        await limiter(ctx, next);
    };
};