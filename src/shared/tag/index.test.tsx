import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import Tag from '.';

describe('Tag', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render its text content', async () => {
    render(<Tag>Hello!</Tag>);
    expect((await screen.findByLabelText('tag')).textContent).toStrictEqual(
      'Hello!'
    );
  });

  it('should render its multiple text content', async () => {
    render(
      <>
        <Tag>Hello, Koishi!</Tag>
        <Tag>Hello, Hoshino!</Tag>
      </>
    );

    expect(
      (await screen.findAllByLabelText('tag')).map(
        (element) => element.textContent
      )
    ).toStrictEqual(['Hello, Koishi!', 'Hello, Hoshino!']);
  });
});
