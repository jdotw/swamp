import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom';
import { addTestPolyfills } from '../test/UITestHelpers';

addTestPolyfills();

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<MemoryRouter><App /></MemoryRouter>)
    expect(wrapper).toBeTruthy()

    // Get by h1
    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('SWAMP')
  })
});
