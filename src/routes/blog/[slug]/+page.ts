import { error } from '@sveltejs/kit';
import { posts } from '#lib/blog.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) error(404, 'Story not found');
	return { post };
};
