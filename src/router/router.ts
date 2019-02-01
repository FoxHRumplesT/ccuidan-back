import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.get('/heros', (req: Request, res: Response) => {
    res.json({code: 200, hero: 'Batman'});
});
