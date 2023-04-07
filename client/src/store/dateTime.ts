import { FortuneFormType } from '@/types';
import { atom } from 'recoil';

export const DateTime = atom<FortuneFormType>({
  key: 'dateTime',
  default: {
    date: '',
    time: '',
  },
});
