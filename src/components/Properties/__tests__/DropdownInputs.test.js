import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer'
import DropdownInputs from '../components/DropdownInputs'
import userEvent from '@testing-library/user-event'


//* cleanup after each test
afterEach(() => {
  cleanup();
});

let priceOptions = ['All','Min Price','Max Price'];
const onChange = jest.fn();
const clearPrice = jest.fn();
let minPrice = '';
let maxPrice = '';

test('Should render a dropdown button',()=>{
    render(<DropdownInputs clear={clearPrice} onChange={onChange} min={minPrice} max={maxPrice} options={priceOptions}/>);
    expect(screen.getByTestId('test-priceFilter')).toBeInTheDocument();
});

test('Dropdown Button text based on minPrice and maxPrice',()=>{
    const {rerender} = render(<DropdownInputs clear={clearPrice} onChange={onChange} min={''} max={''} options={priceOptions}/>);
    expect(screen.getByTestId('test-priceFilter').innerHTML).toBe("Price");

    rerender(<DropdownInputs clear={clearPrice} onChange={onChange} min={1000} max={''} options={priceOptions}/>);
    expect(screen.getByTestId('test-priceFilter').innerHTML).toBe("Above S$ 1000");
    rerender(<DropdownInputs clear={clearPrice} onChange={onChange} min={''} max={3000} options={priceOptions}/>);
    expect(screen.getByTestId('test-priceFilter').innerHTML).toBe("Below S$ 3000");
    rerender(<DropdownInputs clear={clearPrice} onChange={onChange} min={500} max={4000} options={priceOptions}/>);
    expect(screen.getByTestId('test-priceFilter').innerHTML).toBe("S$ 500 - 4000");
});


//* different test method because this one using a select element. using user.click doesn't trigger the function
// test('Changing selection triggers onChange function',async ()=>{
//     const {rerender} = render(<DropdownList onChange={onChange} value={propertyType} options={propertyOptions} className={`filterSearchBarButton`}/>);
//     fireEvent.change(screen.getByTestId('dropdownListTest'), {
//     target: { value: "HDB" },});
//     fireEvent.change(screen.getByTestId('dropdownListTest'), {
//     target: { value: "Apartment" },});
//     fireEvent.change(screen.getByTestId('dropdownListTest'), {
//     target: { value: "Condominium" },});
//     expect(onChange).toHaveBeenCalled();
// });


// // Snapshot tests
// test('match propertyType snapshot for DropdownList',()=>{
//     const tree = renderer.create(<DropdownList onChange={onChange} value={propertyType} options={propertyOptions} className={`filterSearchBarButton`}/>).toJSON();
//     expect(tree).toMatchSnapshot();
// })
