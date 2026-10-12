import { error } from '@sveltejs/kit';
import { crops } from '#lib/crops.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => crops.map((crop) => ({ slug: crop.id }));

export const load: PageLoad = ({ params }) => {
	const crop = crops.find((crop) => crop.id === params.slug);
	if (!crop) error(404, 'Product not found');
	return { crop };
};
