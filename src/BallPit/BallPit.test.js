import React from "react";
import { shallow } from "enzyme";
import BallPit from "./BallPit";

describe('Ball Pit', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BallPit />);
	});

	test('renders with no error', () => {
		expect(wrapper.exists()).toBeTruthy();
	});
});
