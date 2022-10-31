import Axios from 'axios';
import * as https from 'https';
import * as ProxyAgent from 'https-proxy-agent';
import { Config } from './config.helper';

let HttpClient = Axios.create();
if (Config.get('PROXY')) {
  const agent = new ProxyAgent(Config.get('PROXY'));
  HttpClient = Axios.create({ httpsAgent: agent });
}
if (Config.getBoolean('SSL_IGNORE')) {
  HttpClient = Axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
}
export default HttpClient;
