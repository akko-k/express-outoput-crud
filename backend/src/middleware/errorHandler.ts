import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/shared/errors/httpError';
import { sendError } from '@/shared/response/sendResponse';

interface IError {
  name?: string;
  message?: string;
  statusCode?: number;
}

export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    sendError(res, err.statusCode, [err.message]);
    return;
  }

  console.error('Unexpected error:', err);
  sendError(res, 500);

  next(err);
  return;
};
