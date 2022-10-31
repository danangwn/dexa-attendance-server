import { Config } from './config.helper'
export const redisConfig = () => {
    return {
        host: Config.get('REDIS_HOST') || '127.0.0.1',
        port: Config.getNumber('REDIS_PORT') || 6379,
        password: Config.get('REDIS_PASSWORD'),
    }
}