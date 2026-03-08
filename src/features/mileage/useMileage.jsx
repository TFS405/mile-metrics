import { useContext } from 'react';
import { MileageContext } from './mileageContext';

const useMileage = () => {
	const context = useContext(MileageContext);

	if (context === undefined) {
		throw new Error('useMileage was used outside of the MileageProvider');
	}
	return context;
};

export { useMileage };
