import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from './authContext';
import AsyncStorage from '@react-native-community/async-storage';

const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

describe('Auth Context', () => {
  it('should be able to sign in', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.handleSignIn({
        _id: 'id_logged',
        token: 'token_logged',
      });
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith('@authToken', 'token_logged');

    expect(result.current.signed).toBeTruthy();
    expect(result.current.loading).toBeFalsy();
  });
});
