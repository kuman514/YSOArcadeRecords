import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Skeleton from '.';

describe('Skeleton', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <div>
        <Skeleton width="100px" height="100px" borderRadius="20px" />
        <Skeleton width="50px" height="100px" borderRadius="40%" />
        <Skeleton width="100px" height="50px" borderRadius="10rem" />
        <Skeleton width="10rem" height="4rem" borderRadius="1rem" />
        <Skeleton width="100px" height="100px" borderRadius="0" />
      </div>
    );
    expect(container).toMatchSnapshot();
  });
});
