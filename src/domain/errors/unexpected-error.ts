export class UnexpectedError extends Error {
  constructor() {
    super('Erro inesperado. Por favor, tente novamente mais tarde.');
    this.name = 'UnexpectedError';
  }
}
