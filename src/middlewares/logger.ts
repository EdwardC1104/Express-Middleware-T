import { Router } from 'express';
import morgan from 'morgan';
import expressWinston from 'express-winston';
import winston from 'winston';

const router = Router();

let LOGGER = 'winston';

if (LOGGER === 'morgan') {
    morgan.token('user-id', (req, res) => {
        const request = req as unknown as Express.Request;
        return request.user?.id.toString() || '-';
    });
    morgan.token('username', (req, res) => {
        const request = req as unknown as Express.Request;
        return request.user?.username || '-';
    });

    router.use(
        morgan(':method :url :status :user-id :username :res[content-length] - :response-time ms'),
    );
}

if (LOGGER === 'winston') {
    router.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(winston.format.colorize(), winston.format.cli()),
            msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{req.user?.id}} {{req.user?.username}} - {{res.responseTime}}ms',
            colorize: true,
            meta: false,
        }),
    );

    router.use(
        expressWinston.logger({
            transports: [
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'warn',
                }),
            ],
            format: winston.format.combine(winston.format.simple()),
            msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{req.user?.id}} {{req.user?.username}} - {{res.responseTime}}ms',
            colorize: false,
            meta: true,
            statusLevels: true,
        }),
    );
}

export { router as logger };
