import { FieldValidator } from '../contracts';
import { RequiredFieldError } from '../errors';

export class RequiredFieldValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    if (!input[this.field]) {
      return new RequiredFieldError();
    }

    return null;
  }
}
