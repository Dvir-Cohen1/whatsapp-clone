export class NotFoundError extends Error {
  constructor() {
    super("Not found");
  }
}

export class UnauthorizeError extends Error {
  constructor() {
    super("Unauthorize");
  }
}

export class BadRequestError extends Error {
  constructor() {
    super("Bad request");
  }
}
