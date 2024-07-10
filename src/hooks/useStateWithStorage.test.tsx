import { act, renderHook } from '@testing-library/react-hooks';
import useStateWithStorage from './useStateWithStorage';

describe('useStateWithStorage', () => {
  const key = 'testKey';
  const defaultValue = 'defaultValue';

  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => null);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should initialize with default value if localStorage is empty', () => {
    const { result } = renderHook(() => useStateWithStorage(key, defaultValue));

    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(defaultValue)
    );
  });

  it('should initialize with value from localStorage if it exists', () => {
    const storedValue = 'storedValue';
    localStorage.setItem(key, JSON.stringify(storedValue));

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      return JSON.stringify(storedValue);
    });

    const { result } = renderHook(() => useStateWithStorage(key, defaultValue));

    expect(result.current[0]).toBe(storedValue);
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useStateWithStorage(key, defaultValue));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify('newValue')
    );
  });
});
