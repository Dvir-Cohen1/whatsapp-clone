import { NotFoundError, UnauthorizeError, BadRequestError } from "./Error";

/**
 * @param  {any} errorStack
 * Show error stack if in development mode.
 */
function returnErrorStackByEnvironment(errorStack: any) {
  return process.env.NODE_ENV === "development" ? errorStack : {};
}

export function errorHandler(error: Error, req: any, res: any, next: any) {
  switch (error.constructor) {
    case NotFoundError:
      return res.status(404).json({
        error: true,
        message: error.message,
        stack: returnErrorStackByEnvironment(error.stack),
      });

    case UnauthorizeError:
      // console.log(error.stack);
      return res.status(403).json({
        error: true,
        message: error.message,
        stack: returnErrorStackByEnvironment(error.stack),
      });

    case BadRequestError:
      return res.status(400).json({
        error: true,
        message: error.message,
        stack: returnErrorStackByEnvironment(error.stack),
      });

    default:
      res.status(500).json({ ok: false, message: "Somthing Went Wrong!" });
      break;
  }
}
