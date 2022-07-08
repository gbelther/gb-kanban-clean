import { Validation } from '@/presentation/contracts';
import { FieldValidator } from '@/validation/contracts';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidator[]) {}

  static build(validators: FieldValidator[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter(
      validator => validator.field === fieldName,
    );

    if (validators.length > 0) {
      for (const validator of validators) {
        const error = validator.validate(input);
        if (error) return error.message;
      }
    }
    return '';
  }
}
