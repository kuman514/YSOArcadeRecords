import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Sample test', () => {
  it('should say that 1 + 2 === 3', () => {
    expect(1 + 2).toStrictEqual(3);
  });

  // prettier-ignore
  it('should say that 1 + 2 !== \'3\'', () => {
    expect(1 + 2).not.toStrictEqual('3');
  });

  it('should render', async () => {
    render(<div aria-label="hello">Hello!</div>);
    expect((await screen.findByLabelText('hello')).textContent).toStrictEqual(
      'Hello!'
    );
  });
});
