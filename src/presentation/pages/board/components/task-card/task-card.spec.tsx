import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { TaskCard } from '.';

type MakeSutParams = {
  title?: string;
  content?: string;
};

const makeSut = ({
  title = faker.random.word(),
  content = faker.random.words(),
}: MakeSutParams): void => {
  renderTheme(<TaskCard title={title} content={content} />);
};

describe('<TaskCard />', () => {
  it('should render title correctly', () => {
    const title = faker.random.word();
    makeSut({ title });
    expect(screen.queryByText(title)).toBeTruthy();
  });

  it('should render content correctly', () => {
    const content = faker.random.words();
    makeSut({ content });
    expect(screen.queryByText(content)).toBeTruthy();
  });
});
