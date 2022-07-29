import { Router } from 'express';

const router = Router();

router.get('/causeError/', (req, res) => {
    res.status(500).json({ errors: [{ msg: 'Internal Server Error' }] });
});

export { router as causeError };
