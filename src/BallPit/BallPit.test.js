import React from "react";
import { mount } from "enzyme";
import BallPit from "./BallPit";
import 'jest-canvas-mock';

describe('Ball Pit', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<BallPit />);
	});

	test('renders with no error', () => {
		expect(wrapper.exists()).toBeTruthy();
	});
});
