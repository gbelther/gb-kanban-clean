import { faker } from '@faker-js/faker';
import { RequiredFieldValidator } from '@/validation/validators/required-field-validator';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidator(field)]);
  });
});
