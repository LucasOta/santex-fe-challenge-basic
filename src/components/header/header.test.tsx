import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Header from '.';
import { useOrder } from '../../contexts/order-context';
import useStateWithStorage from '../../hooks/useStateWithStorage';

// Mock the useOrder hook
jest.mock('../../contexts/order-context', () => ({
  useOrder: jest.fn(),
}));

// Mock the useStateWithStorage hook
jest.mock('../../hooks/useStateWithStorage', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Header component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should display the logo', () => {
    (useOrder as jest.Mock).mockReturnValue({ order: null });
    (useStateWithStorage as jest.Mock).mockReturnValue([0, jest.fn()]);

    render(<Header />);

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/santex-logo-dark.svg');
  });

  it('should display "There\'s no product selected." when there is no order', () => {
    (useOrder as jest.Mock).mockReturnValue({ order: null });
    (useStateWithStorage as jest.Mock).mockReturnValue([0, jest.fn()]);

    render(<Header />);

    expect(
      screen.getByText("There's no product selected.")
    ).toBeInTheDocument();
  });

  it('should display the order total when there is an order', () => {
    const mockOrder = { id: '1', total: 100 };
    (useOrder as jest.Mock).mockReturnValue({ order: mockOrder });
    (useStateWithStorage as jest.Mock).mockReturnValue([
      mockOrder.total,
      jest.fn(),
    ]);

    render(<Header />);

    expect(screen.getByText('Order total: $100')).toBeInTheDocument();
  });

  it('should update the subtotal when the order changes', () => {
    const setSubtotalMock = jest.fn();
    (useOrder as jest.Mock).mockReturnValue({ order: { id: '1', total: 100 } });
    (useStateWithStorage as jest.Mock).mockReturnValue([0, setSubtotalMock]);

    render(<Header />);

    expect(setSubtotalMock).toHaveBeenCalledWith(100);
  });
});
