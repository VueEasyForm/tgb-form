import { expect, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import { MyButton } from '../src';

test('button', () => {
  const page = render(MyButton, {
    props: {
      type: 'primary',
    },
  });
  expect(page.container.textContent).toMatchInlineSnapshot(`" my button type: primary count: 0"`);
});
