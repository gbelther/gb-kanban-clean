import { FieldValidator } from '@/validation/contracts';
import { RequiredFieldValidator } from '@/validation/validators/required-field-validator';

export class ValidationBuilder {
  constructor(
    private readonly fieldName: string,
    private readonly validators: FieldValidator[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validators.push(new RequiredFieldValidator(this.fieldName));
    return this;
  }

  build(): FieldValidator[] {
    return this.validators;
  }
}
