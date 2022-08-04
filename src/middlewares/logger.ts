import { Request, Response, Router } from 'express';
// import morgan from 'morgan';
// import expressWinston from 'express-winston';
// import winston from 'winston';
import { createLogger, transports, createTemplate, format } from '@loggers/custom';
import { Level } from '@loggers/custom/levels';

const router = Router();

// let LOGGER = 'winston';

// if (LOGGER === 'morgan') {
//     morgan.token('user-id', (req, res) => {
//         const request = req as unknown as Express.Request;
//         return request.user?.id.toString() || '-';
//     });
//     morgan.token('username', (req, res) => {
//         const request = req as unknown as Express.Request;
//         return request.user?.username || '-';
//     });

//     router.use(
//         morgan(':method :url :status :user-id :username :res[content-length] - :response-time ms'),
//     );
// }

// if (LOGGER === 'winston') {
// router.use(
//     expressWinston.logger({
//         transports: [new winston.transports.Console()],
//         format: winston.format.combine(winston.format.colorize(), winston.format.cli()),
//         msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{req.user?.id}} {{req.user?.username}} - {{res.responseTime}}ms',
//         colorize: true,
//         meta: false,
//     }),
// );

//     router.use(
//         expressWinston.logger({
//             transports: [
//                 new winston.transports.File({
//                     filename: 'error.log',
//                     level: 'warn',
//                 }),
//             ],
//             format: winston.format.combine(winston.format.simple()),
//             msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{req.user?.id}} {{req.user?.username}} - {{res.responseTime}}ms',
//             colorize: false,
//             meta: true,
//             statusLevels: true,
//         }),
//     );
// }

const logger = createLogger({
    level: 'info',
    transports: [
        new transports.console({
            level: 'info',
            colorize: true,
            template: createTemplate(format.level(), format.newLine(), format.message()),
        }),
        new transports.file({
            level: 'warn',
            template: createTemplate(format.level(), format.text(': '), format.message()),
            path: 'custom.log',
        }),
    ],
});

interface RequestWithCustomLogger extends Request {
    _customLoggerStartTime?: Date;
}

router.use((req: RequestWithCustomLogger, res, next) => {
    const performLogging = (req: RequestWithCustomLogger, res: Response) => {
        let mode: Level = 'info';
        if (res.statusCode)
            if (res.statusCode < 400) mode = 'info';
            else if (res.statusCode < 500) mode = 'warn';
            else if (res.statusCode >= 500) mode = 'error';

        let responseTime = ``;
        if (typeof req._customLoggerStartTime !== 'undefined')
            responseTime = `${new Date().getTime() - req._customLoggerStartTime.getTime()}ms`;

        const startTime = req._customLoggerStartTime?.toUTCString();

        logger[
            mode
        ]`auth | ${req.method} | ${req.url} | ${res.statusCode} | ${req.ip} | ${startTime} | ${responseTime} | ${req.user?.username}`;
    };

    req._customLoggerStartTime = new Date();
    if (res.headersSent) performLogging(req, res);
    else {
        res.on('finish', () => performLogging(req, res));
    }

    next();
});

export { router as logger };
