import { useReducer } from 'react';
import { MileageContext } from './mileageContext';
import { produce } from 'immer';

const initialState = {
	entries: [],
};

const reducer = produce((draft, action) => {
	switch (action.type) {
		case 'mileage/addMiles': {
			const existingEntry = draft.entries.find(
				(entry) => entry.date === action.payload.date,
			);

			if (existingEntry) {
				existingEntry.totalMiles += action.payload.totalMiles;

				const newAreas = action.payload.areas.filter(
					(area) => !existingEntry.areas.includes(area),
				);

				if (newAreas) existingEntry.areas.push(...newAreas);

				break;
			}
			draft.entries.push(action.payload);
			break;
		}

		default:
			break;
	}
});

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
