import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseModal from './BaseModal';

describe('BaseModal component', () => {
  it('should render modal', async () => {
    const setIsOpen = vi.fn();
    render(<BaseModal isOpen={true} setIsOpen={setIsOpen} children={<></>} />);
    expect(screen.getByTestId('base-modal')).toBeTruthy();
  });
});

