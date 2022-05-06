import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer'
import userEvent from '@testing-library/user-event'
import PopupFilter from '../components/PopupFilter'

//* cleanup after each test
afterEach(() => {
    cleanup();
});

test('Button for Filter Modal should render',()=>{
    render(<PopupFilter />);
    expect(screen.getByTestId('test-PopupFilter')).toBeInTheDocument();
})
