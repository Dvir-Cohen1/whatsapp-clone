import {
  NotFoundError,
  UnauthorizeError,
  BadRequestError,
  ServerError,
} from "./Error";

/**
 * @param  {any} errorStack
 * Show error stack if in development mode.
 */
function returnErrorStackByEnvironment(errorStack: any) {
  return process.env.NODE_ENV === "development" ? errorStack : {};
}

function generateCustomErrorResponse(res: any, error: any, statusCode: number) {
  return res.status(statusCode).json({
    error: true,
    message: error.message,
    stack: returnErrorStackByEnvironment(error.stack),
  });
}

export function errorHandler(error: Error, req: any, res: any, next: any) {
  switch (error.constructor) {
    case NotFoundError:
      return generateCustomErrorResponse(res, error, 404);

    case UnauthorizeError:
      return generateCustomErrorResponse(res, error, 403);

    case BadRequestError:
      return generateCustomErrorResponse(res, error, 400);

    default:
      res.status(500).json(new ServerError());
      break;
  }
}
