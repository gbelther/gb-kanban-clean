import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { TaskCard } from '.';

const makeSut = (
  title = faker.random.word(),
  content = faker.random.words(),
): void => {
  renderTheme(<TaskCard title={title} content={content} />);
};

describe('<TaskCard />', () => {
  it('should render title correctly', () => {
    const title = faker.random.word();
    makeSut(title);
    expect(screen.queryByText(title)).toBeTruthy();
  });
});
