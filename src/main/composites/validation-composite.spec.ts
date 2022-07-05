/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import { FieldValidator } from '@/validation/contracts';
import { ValidationComposite } from './validation-composite';

class FieldValidatorSpy implements FieldValidator {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return null;
  }
}

type SutTypes = {
  sut: ValidationComposite;
  fieldValidatorsSpy: FieldValidatorSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidatorsSpy = [new FieldValidatorSpy(fieldName)];
  const sut = new ValidationComposite(fieldValidatorsSpy);
  return {
    sut,
    fieldValidatorsSpy,
  };
};

describe('ValidationComposite', () => {
  it('should return error if any validator fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidatorsSpy } = makeSut(fieldName);
    const errorMessage = faker.hacker.phrase();
    jest
      .spyOn(fieldValidatorsSpy[0], 'validate')
      .mockImplementationOnce(() => new Error(errorMessage));
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(errorMessage);
  });

  it('should return falsy if none of validators fail', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
