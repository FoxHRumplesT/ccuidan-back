import { Request, Response } from 'express';
import * as authService from '../services/auth';

export const handleLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.loginWithEmailAndPassword(email, password)
    .then(r => {
      if (r) res.json({message: 'User logged', data: {token: 'generated'}});
      else res.json({message: 'User logged', data: {token: 'generated'}});
    })
    .catch(errors => res.status(500).json(errors));
};
