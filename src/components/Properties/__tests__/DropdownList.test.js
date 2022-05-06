import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer'
import DropdownList from '../components/DropdownList'
import userEvent from '@testing-library/user-event'


//* cleanup after each test
afterEach(() => {
  cleanup();
});

let propertyOptions = ['Property Type: All','HDB','Condominium','Apartment']
let propertyType = 'All'
const onChange = jest.fn();

test('Everything should render',()=>{
    render(<DropdownList onChange={onChange} value={propertyType} options={propertyOptions} className={`filterSearchBarButton`}/>);
    expect(screen.getByTestId('dropdownListTest')).toBeInTheDocument();
    expect(screen.getByTestId('test-HDB')).toBeInTheDocument();
    expect(screen.getByTestId('test-Apartment')).toBeInTheDocument();
    expect(screen.getByTestId('test-Condominium')).toBeInTheDocument();
});

//* different test method because this one using a select element. using user.click doesn't trigger the function
test('Changing selection triggers onChange function',async ()=>{
    const {rerender} = render(<DropdownList onChange={onChange} value={propertyType} options={propertyOptions} className={`filterSearchBarButton`}/>);
    fireEvent.change(screen.getByTestId('dropdownListTest'), {
    target: { value: "HDB" },});
    fireEvent.change(screen.getByTestId('dropdownListTest'), {
    target: { value: "Apartment" },});
    fireEvent.change(screen.getByTestId('dropdownListTest'), {
    target: { value: "Condominium" },});
    expect(onChange).toHaveBeenCalled();
});


// Snapshot tests
test('match propertyType snapshot for DropdownList',()=>{
    const tree = renderer.create(<DropdownList onChange={onChange} value={propertyType} options={propertyOptions} className={`filterSearchBarButton`}/>).toJSON();
    expect(tree).toMatchSnapshot();
})
