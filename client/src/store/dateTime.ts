import { FortuneFormType } from '@/types';
import { atom } from 'recoil';
import { Cookies } from 'react-cookie';
import { AtomEffect } from 'recoil';
import { v1 } from 'uuid';

export const setCookieEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const cookies = new Cookies();
      const savedValue = cookies.get(key);
      if (savedValue != null) {
        setSelf(savedValue);
      }
      onSet((newValue) => {
        cookies.set(key, newValue, {
          path: '/',
          expires: new Date(Date.now() + 24 * 1 * 60 * 60 * 1000),
        });
      });
    }
  };

export const DateTime = atom<FortuneFormType>({
  key: `dateTime${v1}`,
  default: {
    date: '',
    time: '',
  },
  effects: [setCookieEffect('userBirth')],
});
