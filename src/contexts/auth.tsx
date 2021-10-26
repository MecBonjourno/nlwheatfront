import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

type AuthProvider = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=b4c6e858b5701eee78eb`;

  async function signIn(GithubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: GithubCode,
    });

    const { token, user } = await response.data;

    localStorage.setItem('@dowhile:token', token);
    setUser(user);
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer + ${token}`;

      api.get('profile').then(response => {
        console.log(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGitHubCode = url.includes('?code=');

    if (hasGitHubCode) {
      const [urlWihoutCode, GithubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWihoutCode);

      console.log(urlWihoutCode, GithubCode);
      signIn(GithubCode);
    }
  }, []);

  return <AuthContext.Provider value={{ signInUrl, user }}>{props.children}</AuthContext.Provider>;
}
