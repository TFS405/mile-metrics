import { useReducer } from 'react';
import { MileageContext } from './mileageContext';

const initialState = {
	entries: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'mileage/addMiles':
			return {
				...state,
				entries: [...state.entries, action.payload],
			};
		default:
			return state;
	}
};

const MileageProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { entries } = state;

	return (
		<MileageContext.Provider value={{ entries, dispatch }}>
			{children}
		</MileageContext.Provider>
	);
};

export { MileageProvider };
