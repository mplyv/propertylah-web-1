import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import ImageViewer from '../components/ImageViewer'
import renderer from 'react-test-renderer'

//* cleanup after each test
afterEach(() => {
    cleanup();
});

let source=[
    '/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg',
    '/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-2.jpg',
    '/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-3.jpg',
    '/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-4.jpg'
]

let onClick = jest.fn();

test('First image should render',()=>{
    render(<ImageViewer source={source} />);
    const image = screen.getByTestId(`scrollingImage`);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('http://localhost/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg');
})

test('buttons should render',()=>{
    render(<ImageViewer source={source} />);
    const prevButton = screen.getByTestId(`prevButton`);
    const nextButton = screen.getByTestId(`nextButton`);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
})

test('On initial load, clicking next button should go to next image', async()=>{
    render(<ImageViewer source={source}/>);
    const user = userEvent.setup()
    const image = screen.getByTestId(`scrollingImage`);
    const nextButton = screen.getByTestId(`nextButton`);
    await user.click(nextButton);
    expect(image.src).toBe('http://localhost/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-2.jpg');
})

test('On initial load, clicking prev button should not change image', async()=>{
    render(<ImageViewer source={source}/>);
    const user = userEvent.setup()
    const image = screen.getByTestId(`scrollingImage`);
    const prevButton = screen.getByTestId(`prevButton`);
    await user.click(prevButton);
    expect(image.src).toBe('http://localhost/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg');
})

test('If only 1 image, both buttons do nothing', async()=>{
    render(<ImageViewer source={['/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-4.jpg']}/>);
    const user = userEvent.setup()
    const image = screen.getByTestId(`scrollingImage`);
    const prevButton = screen.getByTestId(`prevButton`);
    const nextButton = screen.getByTestId(`nextButton`);
    await user.click(nextButton);
    expect(image.src).toBe('http://localhost/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-4.jpg');
    await user.click(prevButton);
    expect(image.src).toBe('http://localhost/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-4.jpg');
})

test('match source snapshot',()=>{
    const tree = renderer.create(<ImageViewer source={source}/>).toJSON();
    expect(tree).toMatchSnapshot();
})
