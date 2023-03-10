import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('should render spinner', () => {
    render(<Spinner />);
  });
});

