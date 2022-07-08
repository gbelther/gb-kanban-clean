import { ValidationBuilder } from '@/main/builders/validation-builder';
import { ValidationComposite } from '@/main/composites/validation-composite';

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().build(),
  ]);
