export class Response<T> {
  statusCode: number;
  message: string;
  data: T;
  constructor(data: T | null = null, statusCode = 200, message = '') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
