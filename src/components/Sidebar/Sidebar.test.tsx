import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, vi } from 'vitest';
import Sidebar from './Sidebar';

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useLocation: () => ({
      search: '',
      pathname: '/',
    }),
    Link: ({ children, to }: { children: JSX.Element; to: string }) =>
      React.createElement('a', { href: to }, children),
  };
});
describe('Sidebar component', () => {
  it('should render sidebar', () => {
    render(<Sidebar />);
  });
});

