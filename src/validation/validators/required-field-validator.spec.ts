import { faker } from '@faker-js/faker';
import { RequiredFieldError } from '../errors';
import { RequiredFieldValidator } from './required-field-validator';

const makeSut = (field: string): RequiredFieldValidator =>
  new RequiredFieldValidator(field);

describe('RequiredFieldValidator', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.words() });
    expect(error).toBeFalsy();
  });
});
