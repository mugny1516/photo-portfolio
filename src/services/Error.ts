// from: https://future-architect.github.io/typescript-guide/exception.html
export class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export class UnNotifiedError extends BaseError {}

export class DisplayedError extends BaseError {
  public constructor(public errorMessage: string, public error?: unknown) {
    super(`ユーザーに表示するエラー：${errorMessage}`);
  }
}
