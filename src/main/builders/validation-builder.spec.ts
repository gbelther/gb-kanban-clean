import { faker } from '@faker-js/faker';
import { RequiredFieldValidator } from '@/validation/validators/required-field-validator';
import { ValidationBuilder as sut } from './validation-builder';
import { EmailValidator } from '@/validation/validators/email-validator';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidator(field)]);
  });

  test('Should return EmailValidator', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidator(field)]);
  });

  test('Should return a list of validators', () => {
    const field = faker.database.column();

    const validations = sut.field(field).required().email().build();

    expect(validations).toEqual([
      new RequiredFieldValidator(field),
      new EmailValidator(field),
    ]);
  });
});
