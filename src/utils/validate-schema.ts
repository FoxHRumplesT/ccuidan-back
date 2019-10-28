import { ValidationError, Schema, ValidationErrorItem } from 'joi';
import { Request, Response, NextFunction } from 'express';

const mapErrorValidator = (error: ValidationError): Array<{key?: any, message: string}> => {
  return !!error ? error.details.map(
    (details: ValidationErrorItem) => ({ key: !!details.context ? details.context.key : null, message: details.message })
  ) : [];
};

export const validateSchema = (schema: Schema, req: Request, res: Response, next: NextFunction): void => {
  schema.validate(req.body, { abortEarly: false }, (err, value) => {
    if (!!err) res.status(400).json(mapErrorValidator(err));
    else next();
  });
};
