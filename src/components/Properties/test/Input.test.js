
import { unmountComponentAtNode } from "react-dom";
import {render, screen, fireEvent} from '@testing-library/react';
import { act } from "react-dom/test-utils";
import Input from '../components/Input';
import {useState} from 'react';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('Input.js should render 2 inputs with id given by props.options',()=>{
  act(()=>{
    render(<Input options={['MinPrice','MaxPrice']} min={0} max={100} onChange={jest.fn()}/>, container);
  });
  expect(document.querySelector('#MinPrice').id).toBe('MinPrice');
  expect(document.querySelector('#MaxPrice').id).toBe('MaxPrice');
  act(()=>{
    render(<Input options={['MinPSF','MaxPSF']} min={0} max={100} onChange={jest.fn()}/>, container);
  });
  expect(document.querySelector('#MinPSF').id).toBe('MinPSF');
  expect(document.querySelector('#MaxPSF').id).toBe('MaxPSF');
})

it('Input.js should render with min and max values given by props.min and props.max',()=>{
  act(()=>{
    render(<Input options={['MinPrice','MaxPrice']} min={0} max={100} onChange={jest.fn()}/>, container);
  });
  expect(document.querySelector('#MinPrice').value).toBe('0');
  expect(document.querySelector('#MaxPrice').value).toBe('100');
})


