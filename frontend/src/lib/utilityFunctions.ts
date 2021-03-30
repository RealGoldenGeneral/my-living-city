import { IUser } from "./types/data/user.type";

/**
 * Stringifies given Object and stores it in local storage using the 
 * localStorageKey param.
 * 
 * @param localStorageKey The key that will be stored in Local storage to access data
 * @param obj A Javascript object that will be stringified
 */
export const storeObjectInLocalStorage = (
  localStorageKey: string,
  obj: Object
): void => {
  const stringifiedObj = JSON.stringify(obj);
  localStorage.setItem(localStorageKey, stringifiedObj);
}

export const storeUserAndTokenInLocalStorage = (
  token: string,
  user: IUser,
): void => {
  storeObjectInLocalStorage('logged-user', user);
  localStorage.setItem('token', token);
}