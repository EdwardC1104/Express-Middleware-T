import express from 'express';
import { deleteUser } from '@routes/delete';
import { profile } from '@routes/profile';
import { logout } from '@routes/logout';
import { login } from '@routes/login';
import { signup } from '@routes/signup';
import { root } from '@routes/root';
import { authentication } from '@middlewares/authentication';
import { logger } from '@middlewares/logger';
import helmet from 'helmet';
import { causeError } from '@routes/causeError';

const app = express();

// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(logger);
app.use(authentication);

// Routes:
app.use(root);
app.use(signup);
app.use(login);
app.use(logout);
app.use(profile);
app.use(deleteUser);
app.use(causeError);

export { app };
