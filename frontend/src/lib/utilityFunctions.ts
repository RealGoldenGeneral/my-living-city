import { IUser } from './types/data/user.type';
import { FetchError } from './types/types';

/**
 * Stringifies given Object and stores it in local storage using the 
 * localStorageKey param.
 * 
 * @param localStorageKey The key that will be stored in Local storage to access data
 * @param obj A Javascript object that will be stringified
 */
export const storeObjectInLocalStorage = (localStorageKey: string, obj: Object): void => {
	const stringifiedObj = JSON.stringify(obj);
	localStorage.setItem(localStorageKey, stringifiedObj);
};

/**
 * A utility function that stores a given user object and token in local storage
 * @param token A valid token retrieved from register or login and stored in memory
 * @param user A user object that will be stored in memory
 */
export const storeUserAndTokenInLocalStorage = (token: string, user: IUser): void => {
	storeObjectInLocalStorage('logged-user', user);
	localStorage.setItem('token', token);
};

/**
 * Capitalize the first letter of a string.
 * @param s A string to capitalize
 * @returns A new string with the first character capitalized
 */
export const capitalizeString = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Error handling function that parses a potential Axios error that may be thrown when submitting 
 * new data.
 * 
 * @param genericMessage Fallback error message if no specific message is received from server
 * @param error An error object thrown that could be any
 * @returns {FetchError} Error details
 */
export const handlePotentialAxiosError = (genericMessage: string, error: any): FetchError => {
	let errorObj: FetchError = {
		message: ''
	};
	if (error.response) {
		// Request made and server responded
		errorObj.message = error.response.data.message;
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		errorObj.message = 'Error no response received';
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
};

// https://stackoverflow.com/questions/14980014/how-can-i-calculate-the-time-between-2-dates-in-typescript
/**
 * Calculates the difference between the dates and returns a string representation of the 
 * difference between them. 
 * 
 * @param current A Date object that will be the Minuend of the calculation.
 * @param previous A Date object that will be the subtrahend of the calculation.
 * @returns A simplified difference in time as a string.
 */
export const timeDifference = (current: Date, previous: Date) => {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current.getTime() - previous.getTime();

	if (elapsed < msPerMinute) {
		return Math.round(elapsed / 1000) + ' seconds ago';
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' minutes ago';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' hours ago';
	} else if (elapsed < msPerMonth) {
		return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
	} else if (elapsed < msPerYear) {
		return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
	} else {
		return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
	}
}
