export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || "Not Found");
  }
}

export class UnauthorizeError extends Error {
  constructor(message?: string) {
    super(message || "Unauthorize");
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message || "Bad Request");
  }
}
export class ServerError extends Error {
  constructor(message?: string) {
    super(message || "Somthing went wrong");
  }
}
