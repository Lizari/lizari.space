import { Config } from '@/libs/Config';
import { createClient } from 'microcms-js-sdk';

export const Client = createClient({
  serviceDomain: Config.MICROCMS_DOMAIN,
  apiKey: Config.API_KEY,
});
