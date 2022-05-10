import * as React from "react";
jest.mock("lodash");
import {render, screen, cleanup} from '@testing-library/react';
import Modal from "../Modal";


afterEach(() => {
  cleanup();
});

test('Modal should appear',()=>{
  render(<Modal />);
  expect(screen.getByTestId('modal')).toBeInTheDocument();
})


