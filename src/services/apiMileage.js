import toast from 'react-hot-toast';
import { supabase } from './supabase';

export const getMileageEntries = async () => {
	const { data, error } = await supabase.from('Miles').select('*');

	if (error) {
		console.log(error);
		toast.error(error.message, {
			duration: 5000,
			position: 'top-center',
		});
		throw new Error('Mileage entries could not be loaded');
	}

	return data;
};
