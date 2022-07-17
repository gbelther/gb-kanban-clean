import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { TaskCard } from '.';

type MakeSutParams = {
  title?: string;
  content?: string;
  onStatusLeftButton?: () => void;
  onStatusRightButton?: () => void;
};

const makeSut = ({
  title = faker.random.word(),
  content = faker.random.words(),
  onStatusLeftButton = jest.fn(),
  onStatusRightButton = jest.fn(),
}: MakeSutParams): void => {
  renderTheme(
    <TaskCard
      title={title}
      content={content}
      onStatusLeftButton={onStatusLeftButton}
      onStatusRightButton={onStatusRightButton}
    />,
  );
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
