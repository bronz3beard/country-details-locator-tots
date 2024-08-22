import { AppDrawers, DrawerValues } from './types';

export const getDrawerState = (initialStateValue?: boolean): DrawerValues => {
  const initialState: DrawerValues = {};

  Object.keys(AppDrawers).forEach((key) => {
    if (!isNaN(Number(key))) {
      initialState[key] = initialStateValue !== undefined ? initialStateValue : false;
    }
  });

  return initialState;
};
