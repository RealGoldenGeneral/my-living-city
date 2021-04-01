import { IUser } from "./types/data/user.type";
import { FetchError } from "./types/types";

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

/**
 * A utility function that stores a given user object and token in local storage
 * @param token A valid token retrieved from register or login and stored in memory
 * @param user A user object that will be stored in memory
 */
export const storeUserAndTokenInLocalStorage = (
  token: string,
  user: IUser,
): void => {
  storeObjectInLocalStorage('logged-user', user);
  localStorage.setItem('token', token);
}

/**
 * Capitalize the first letter of a string.
 * @param s A string to capitalize
 * @returns A new string with the first character capitalized
 */
export const capitalizeString = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Error handling function that parses a potential Axios error that may be thrown when submitting 
 * new data.
 * 
 * @param genericMessage Fallback error message if no specific message is received from server
 * @param error An error object thrown that could be any
 * @returns {FetchError} Error details
 */
export const handlePotentialAxiosError = (
  genericMessage: string, 
  error: any,
): FetchError => {
  let errorObj: FetchError = {
    message: ''
  }
  if (error.response) {
    // Request made and server responded
    errorObj.message = error.response.data.message;
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    errorObj.message = "Error no response received"
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    errorObj.message = error.message;
    console.log('Error', error.message);
  }

  if (!errorObj.message) {
    errorObj.message = genericMessage;
  }

  console.log(error);

  return errorObj;
}