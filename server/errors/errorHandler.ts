import { NotFoundError, UnauthorizeError, BadRequestError } from "./Error";

export function errorHandler(error: Error, res: any) {
  console.log(error.constructor)
  switch (error.constructor) {
    case NotFoundError:
      return res.status(404).json({ ok: false, message: error.message});

    case UnauthorizeError:
      return res.status(403).json({ ok: false, message: error.message });

    case BadRequestError:
      return res.status(400).json({ ok: false, message: error.message });

    default:
      res.status(500).json({ ok: false, message: error.message });
      break;
  }
}
