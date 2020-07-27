import React from 'react';
import App from './App';
import { shallow } from "enzyme";

describe('Ball Bouncing App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('renders with no error', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});