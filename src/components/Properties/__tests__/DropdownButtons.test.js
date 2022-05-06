import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer'
import DropdownButtons from '../components/DropdownButtons'
import userEvent from '@testing-library/user-event'


//* cleanup after each test
afterEach(() => {
  cleanup();
});

let propertyTypeOptions = ['All Property','HDB','Apartment','Condominium'];
let propertyType = 'All'
let bathOptions = ['All Qty Bathrooms','1bath','2bath','3bath','4bath','5+bath'];
let noOfBathrooms = 'All'
let bedroomOptions = ['All Qty Bedrooms','1bed','2bed','3bed','4bed','5+bed'];
let noOfBedrooms = 'All'
let tenureOptions = ['All Tenure','Freehold','Leasehold'];
let tenure = 'All'

test('Should render a div for each option for type=(text/num)',()=>{
    const {rerender} = render(<DropdownButtons handleChange={jest.fn()} options={propertyTypeOptions} type='text' variable={propertyType}/>);
    expect(screen.getByTestId('All Property')).toBeInTheDocument();
    expect(screen.getByTestId('HDB')).toBeInTheDocument();
    expect(screen.getByTestId('Apartment')).toBeInTheDocument();
    expect(screen.getByTestId('Condominium')).toBeInTheDocument();

    rerender(<DropdownButtons handleChange={jest.fn()} options={bathOptions} type='num' variable={noOfBathrooms}/>);
    expect(screen.getByTestId('All Qty Bathrooms')).toBeInTheDocument();
    expect(screen.getByTestId('1bath')).toBeInTheDocument();
    expect(screen.getByTestId('2bath')).toBeInTheDocument();
    expect(screen.getByTestId('3bath')).toBeInTheDocument();
    expect(screen.getByTestId('4bath')).toBeInTheDocument();
    expect(screen.getByTestId('5+bath')).toBeInTheDocument();
});

test('Should render divs with innerHTML according to options',()=>{
    const {rerender} = render(<DropdownButtons handleChange={jest.fn()} options={propertyTypeOptions} type='text' variable={propertyType}/>);
    expect(screen.getByTestId('All Property').innerHTML).toBe('All');
    expect(screen.getByTestId('HDB').innerHTML).toBe('HDB');
    expect(screen.getByTestId('Apartment').innerHTML).toBe('Apartment');
    expect(screen.getByTestId('Condominium').innerHTML).toBe('Condominium');

    rerender(<DropdownButtons handleChange={jest.fn()} options={tenureOptions} type='text' variable={tenure}/>);
    expect(screen.getByTestId('All Tenure').innerHTML).toBe('All');
    expect(screen.getByTestId('Freehold').innerHTML).toBe('Freehold');
    expect(screen.getByTestId('Leasehold').innerHTML).toBe('Leasehold');
});

test('1bath to 4bath should render as just 1,2,3,4 // 5+bath should render as 5+' ,()=>{
    render(<DropdownButtons handleChange={jest.fn()} options={bathOptions} type='num' variable={noOfBathrooms}/>);
    expect(screen.getByTestId('1bath').innerHTML).toBe('1');
    expect(screen.getByTestId('2bath').innerHTML).toBe('2');
    expect(screen.getByTestId('3bath').innerHTML).toBe('3');
    expect(screen.getByTestId('4bath').innerHTML).toBe('4');
    expect(screen.getByTestId('5+bath').innerHTML).toBe('5+');
});

test('All Qty Bathrooms should render as All',()=>{
    render(<DropdownButtons handleChange={jest.fn()} options={bathOptions} type='num' variable={noOfBathrooms}/>);
    expect(screen.getByTestId('All Qty Bathrooms').innerHTML).toBe('All');
});

// className tests
test('className for All should be (selected) by default, other buttons should have className(filterSearchBarButton) by default',()=>{
    render(<DropdownButtons handleChange={jest.fn()} options={bathOptions} type='num' variable={noOfBathrooms}/>);
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('selected');
    expect(screen.getByTestId('1bath').className).toBe('filterSearchBarButton');
    expect(screen.getByTestId('2bath').className).toBe('filterSearchBarButton');
    expect(screen.getByTestId('3bath').className).toBe('filterSearchBarButton');
    expect(screen.getByTestId('4bath').className).toBe('filterSearchBarButton');
});

let handleNoOfBaths = jest.fn();
test('handleNoOfBaths function called when pressing buttons', async()=>{
    render(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={noOfBathrooms}/>);
    const user = userEvent.setup()
    await user.click(screen.getByTestId('1bath'));
    expect(handleNoOfBaths).toHaveBeenCalled();
});

test('className changes when pressing buttons', async()=>{
    const {rerender} = render(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={'1'}/>);
    expect(screen.getByTestId('1bath').className).toBe('selected');
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('filterSearchBarButton');

    rerender(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={'2'}/>)
    expect(screen.getByTestId('2bath').className).toBe('selected');
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('filterSearchBarButton');
    rerender(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={'3'}/>)
    expect(screen.getByTestId('3bath').className).toBe('selected');
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('filterSearchBarButton');
    rerender(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={'4'}/>)
    expect(screen.getByTestId('4bath').className).toBe('selected');
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('filterSearchBarButton');
    rerender(<DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={'5'}/>)
    expect(screen.getByTestId('5+bath').className).toBe('selected');
    expect(screen.getByTestId('All Qty Bathrooms').className).toBe('filterSearchBarButton');
});


//Snapshot tests
test('match bathroom snapshot',()=>{
    const tree = renderer.create(<DropdownButtons handleChange={jest.fn()} options={bathOptions} type='num' variable={noOfBathrooms}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('match bedrooms snapshot',()=>{
    const tree = renderer.create(<DropdownButtons handleChange={jest.fn()} options={bedroomOptions} type='num' variable={noOfBedrooms}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('match propertyType snapshot',()=>{
    const tree = renderer.create(<DropdownButtons handleChange={jest.fn()} options={propertyTypeOptions} type='text' variable={propertyType}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('match tenure snapshot',()=>{
    const tree = renderer.create(<DropdownButtons handleChange={jest.fn()} options={tenureOptions} type='text' variable={tenure}/>).toJSON();
    expect(tree).toMatchSnapshot();
})