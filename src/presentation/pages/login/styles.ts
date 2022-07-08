import styled, { css, keyframes } from 'styled-components';

const textDecoration = keyframes`
  from {
    left: 50%;
    right: 50%;
  }

  to {
    left: 0;
    right: 0;
  }
`;

const GridColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled(GridColumn)`
  min-width: 300px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Inputs = styled(GridColumn)`
  gap: 1rem;
  width: 100%;
`;

export const InputBox = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const Input = styled.input`
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 0.25rem 0.5rem;
`;

export const ErrorMessage = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.errorLight};
`;

export const Actions = styled(GridColumn)`
  justify-items: center;
  gap: 0.5rem;
`;

export const Button = styled.button`
  min-width: 150px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 1.125rem;
  font-weight: 500;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.mainDark};
    border-color: ${colors.mainDark};
    color: ${colors.light01};
  `}
`;

export const RegisterLink = styled.a`
  width: min-content;
  white-space: nowrap;
  position: relative;
  font-size: 1rem;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.mainDark};
    height: 1px;
    left: 50%;
    right: 50%;
    top: 1.25rem;
  }

  &:hover {
    &::after {
      animation: ${textDecoration} 0.5s ease;
      left: 0;
      right: 0;
    }
  }
`;

export const Feedback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

export const FeedbackMessage = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.error};
`;

const spinnerRotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrap = styled.div`
  font-size: 1.5rem;
`;

export const Spinner = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0);
  border: 5px solid ${({ theme }) => theme.colors.light01};
  border-bottom-color: transparent;
  animation: ${spinnerRotation} 1s linear infinite;
`;
