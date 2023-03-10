import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AlertActions from './AlertActions';

describe('AlertActions component', () => {
  it('should render alert', () => {
    const message = 'This is a test message';
    const children = <div>Test children</div>;
    const severity = 'error';
    render(
      <AlertActions message={message} children={children} severity={severity} />
    );
    expect(screen.getByText(message)).toBeTruthy();
    expect(screen.getByText('Test children')).toBeTruthy();
    expect(screen.getByText('common.error')).toBeTruthy();
  });
});

