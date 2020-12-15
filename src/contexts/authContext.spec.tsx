import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from './authContext';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

const setItemSpy = jest.spyOn(mockAsyncStorage, 'setItem');
const multiGetSpy = jest.spyOn(mockAsyncStorage, 'multiGet');
const multiRemoveSpy = jest.spyOn(mockAsyncStorage, 'multiRemove');
const multiSetSpy = jest.spyOn(mockAsyncStorage, 'multiSet');

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

  it('should get data storage when app init', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForNextUpdate();

    expect(multiGetSpy).toHaveBeenCalledWith([
      '@authToken',
      '@authWallet',
      '@authWalletName',
    ]);
  });

  it('should be able to signOut', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.handleSignOut());

    await waitForNextUpdate();

    expect(multiRemoveSpy).toHaveBeenCalledWith([
      '@authWallet',
      '@authWalletName',
      '@authToken',
      '@authEmail',
      '@authPass',
    ]);

    expect(result.current.signed).toBeFalsy();
    expect(result.current.wallet).toBeNull();
    expect(result.current.walletName).toBeNull();
  });

  it('should be able to setWallet', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.handleSetWallet('1234', 'myNewWallet'));

    await waitForNextUpdate();

    expect(multiSetSpy).toHaveBeenCalledWith([
      ['@authWallet', '1234'],
      ['@authWalletName', 'myNewWallet'],
    ]);

    expect(result.current.wallet).toBe('1234');
    expect(result.current.walletName).toBe('myNewWallet');
  });
});
