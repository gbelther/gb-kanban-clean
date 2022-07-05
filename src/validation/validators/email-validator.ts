import { FieldValidator } from '../contracts';
import { InvalidFieldError } from '../errors';

export class EmailValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (input[this.field] && !emailRegex.test(input[this.field])) {
      return new InvalidFieldError();
    }

    return null;
  }
}
