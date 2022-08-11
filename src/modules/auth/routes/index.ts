import { Router, Request, Response } from 'express';

import { registerAndLoginEmailValidator } from '../middlewares/validators';
import { COOKIE_SESSION } from '../constants';
import { handleLogin } from '../controllers/auth.controllers';
import * as authService from '../services/auth';

const router = Router();

router.post('/login/email', registerAndLoginEmailValidator, handleLogin);

router.post('/register/email', registerAndLoginEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.registerWithEmailAndPassword(email, password)
    .then(session => {
      res.cookie(COOKIE_SESSION, session.sessionId);
      res.status(200).json({message: 'User registered', data: {...session, token: 'generated'}});
    })
    .catch(errors => res.status(500).json(errors));
});

router.get('/logout', (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_SESSION];
  authService.logout(sessionId);
  res.status(200).json({message: 'Logout'});
});

export default router;
