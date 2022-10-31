import * as crypto from 'crypto';
import { ensureDir, existsSync, outputFile as outputFileFs, readFile, readFileSync, writeJson as writeJsonFs } from 'fs-extra';
import { join } from 'path';
import * as Handlebars from 'handlebars';

export const MS_ONESECOND = 1000;
export const MS_ONEMINUTE = 1000 * 60;
export const MS_ONEHOUR = 1000 * 3600;
export const MS_ONEDAY = 1000 * 3600 * 24;
export const MS_ONEWEEK = 1000 * 3600 * 24 * 7;
export const MS_ONEMONTH = 1000 * 3600 * 24 * 30;

export const unblockEventLoop = async () => new Promise(resolve => setImmediate(resolve));

export async function randomString(length: number): Promise<string> {
    const UIDCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomBytes = crypto.pseudoRandomBytes(length);
    const chars = [];
    for (let i = 0; i < randomBytes.length; i++) {
      chars.push(UIDCHARS[randomBytes[i] % UIDCHARS.length]);
      await unblockEventLoop();
    }
    return chars.join('');
  }

export const renderMessage = (templatePath: string, context?: any) => {
  const findTemplate: string = [
    join(__dirname, '../../src/views/messages', templatePath),
    join(__dirname, '../../src/views/messages', `${templatePath}.hbs`),
    templatePath,
    `${templatePath}.hbs`,
  ].find(o => existsSync(o));

  if (findTemplate) {
    const template = Handlebars.compile(readFileSync(findTemplate, { encoding: 'utf8' }));
    return template(context);
  } else {
    throw new Error('Template not found');
  }
};