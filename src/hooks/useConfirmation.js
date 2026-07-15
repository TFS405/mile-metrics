export const requestConfirmation = (state, setterFn, type) => {
	return new Promise((resolve) => {
		setterFn({
			type,
			resolve,
		});
	});
};
