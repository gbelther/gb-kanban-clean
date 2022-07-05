import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '../errors';
import { EmailValidator } from './email-validator';

const makeSut = (field: string): EmailValidator => new EmailValidator(field);

describe('EmailValidator', () => {
  it('should return error if email is incorrect', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError());
  });
});
