import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer'
import Input from '../components/Input';

//* cleanup after each test
afterEach(() => {
  cleanup();
});

let priceOptions = ['MinPrice','MaxPrice'];
let floorsizeOptions = ['MinFloorSize','MaxFloorSize'];
let PSFOptions = ['MinPSF','MaxPSF'];
let TOPYearOptions = ['MinTOP','MaxTOP']
let minPrice = 0;
let maxPrice = 100;
let minPSF = 0;
let maxPSF = 100;
let minFloorsize = 0;
let maxFloorsize = 100;
let minYear = 1990;
let maxYear = 2020;

test('Input.js should render 2 inputs with id given by options',()=>{
  render(<Input options={priceOptions} min={minPrice} max={maxPrice} onChange={jest.fn()}/>);
  const inputMin = screen.getByTestId(`test-${priceOptions[0]}`);
  const inputMax = screen.getByTestId(`test-${priceOptions[1]}`);
  expect(inputMin).toBeInTheDocument();
  expect(inputMax).toBeInTheDocument();
  expect(inputMin.id).toBe(priceOptions[0]);
  expect(inputMax.id).toBe(priceOptions[1]);
})

test('Input.js should render with min and max values given by min and max',()=>{
  render(<Input options={priceOptions} min={minPrice} max={maxPrice} onChange={jest.fn()}/>);
  const inputMin = screen.getByTestId(`test-${priceOptions[0]}`);
  const inputMax = screen.getByTestId(`test-${priceOptions[1]}`);
  expect(inputMin.value).toBe(minPrice.toString());
  expect(inputMax.value).toBe(maxPrice.toString());
})

test('match price snapshot',()=>{
  const tree = renderer.create(<Input options={priceOptions} min={minPrice} max={maxPrice} onChange={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
})

test('match floorsize snapshot',()=>{
  const tree = renderer.create(<Input options={floorsizeOptions} min={minFloorsize} max={maxFloorsize} onChange={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
})

test('match PSF snapshot',()=>{
  const tree = renderer.create(<Input options={PSFOptions} min={minPSF} max={maxPSF} onChange={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
})

test('match TOPYear snapshot',()=>{
  const tree = renderer.create(<Input options={TOPYearOptions} min={minYear} max={maxYear} onChange={jest.fn()}/>).toJSON();
  expect(tree).toMatchSnapshot();
})