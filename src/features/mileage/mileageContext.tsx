import { createContext, Dispatch } from 'react';

export interface mileageEntry {
	date: string;
	initialMiles: number;
	endingMiles: number;
	areas: string[];
	totalMiles: number;
}

interface mileageContextTypes {
	entries: mileageEntry[];
	dispatch: Dispatch<any>;
}

export const MileageContext = createContext<mileageContextTypes | null>(null);
