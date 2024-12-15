export class CustomError extends Error {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

