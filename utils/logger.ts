import fs from 'fs';

const d = new Date();
const datestamp = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const projectPath = `${process.cwd()}/`;
const filePath = projectPath + (process.env.LOG_DIRNAME?.replace(/^\/|\/$/g, '') ?? 'logs');
const fileName = process.env.LOG_FILENAME?.toLowerCase()?.trim()?.replace(/\s+/, '-') ?? 'log';
const timestamp = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

const logToFile = (type: 'debug' | 'warn' | 'error' | 'info', log: string) => {
    const content = `[${datestamp} ${timestamp}] ${type.toUpperCase()} - ${log} \n`;
    const logFile = `${filePath}/${fileName}-${type}-${datestamp}.log`;

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    if (!fs.existsSync(logFile)) {
        fs.createWriteStream(logFile, { flags: 'w' });
    }

    fs.writeFile(logFile, content, { flag: 'a+' }, (err) => console.error(err));
};

export const debug = (log: string) => logToFile('debug', log);

export const error = (log: string) => logToFile('error', log);

export const info = (log: string) => logToFile('info', log);

export const warn = (log: string) => logToFile('warn', log);
