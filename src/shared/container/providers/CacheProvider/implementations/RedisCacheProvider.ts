import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value)); // salvando no cache sempre convertendo pra JSON
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;
    /**
      quando eu quero resgatar uma informação em cache eu mando pro recover uma tipagem. ex: cache.recover<User[]>
      o User[] passa a ser o <T>
      como no método save eu do um JSON.stringify(value), aqui no recover eu preciso dar um JSON.parse(data) do tipo <T> que é igual User[], assim o parsedData não vira um any
    */

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {}
}