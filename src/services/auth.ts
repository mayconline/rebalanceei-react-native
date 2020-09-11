interface IResponse {
  token: string;
  user: {
    email: string;
    password: string;
  };
}

export const signIn = (): Promise<IResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'assasasadsds',
        user: {
          email: 'teste@teste.com.br',
          password: '123',
        },
      });
    }, 2000);
  });
};
