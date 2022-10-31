import { SendMailOptions } from 'nodemailer';
import { Stream } from 'stream';

export interface CustomMailOptions extends SendMailOptions {
  to?: string;
  cc?: string;
  bcc?: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  context?: {
    [name: string]: any;
  };
  attachments?: Array<{
    filename?: string;
    path?: string;
    contents?: string | Buffer | Stream,
    cid?: string;
    href?: URL | string
  }>;
}
