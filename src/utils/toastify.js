/**
 * @name infoToast
 * @description Displays an info toast.
 * @param {string} title
 * @param {string} description
 * @param {function} toast
 */
export const infoToast = (title, description, toast) => {
	return toast({
		title: title,
		description: description,
		status: 'info',
		duration: 5000,
		isClosable: true,
	});
};

/**
 * @name successToast
 * @description Displays an success toast.
 * @param {string} title
 * @param {string} description
 * @param {function} toast
 */
export const successToast = (title, description, toast) => {
	return toast({
		title: title,
		description: description,
		status: 'success',
		duration: 5000,
		isClosable: true,
	});
};

/**
 * @name errorToast
 * @description Displays an error toast.
 * @param {string} title
 * @param {string} description
 * @param {function} toast
 */
export const errorToast = (title, description, toast) => {
	return toast({
		title: title,
		description: description,
		status: 'error',
		duration: 5000,
		isClosable: true,
	});
};
