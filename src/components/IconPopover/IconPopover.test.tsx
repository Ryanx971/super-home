import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IconPopover from './IconPopover';

describe('IconPopover component', () => {
  it('should render icon popover component', async () => {
    const childrenText = 'Icon popover children';
    render(
      <IconPopover
        children={<div>{childrenText}</div>}
        anchorOriginVertical="bottom"
        anchorOriginHorizontal="center"
        transformOriginVertical="top"
        transformOriginHorizontal="center"
      />
    );
    fireEvent.click(screen.getByTestId('color-picker-button'));
    expect(screen.getByText(childrenText)).toBeTruthy();
  });
});

