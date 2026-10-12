export const crops = [
	{
		id: 'vegetable',
		name: 'Vegetables',
		label: 'Vegetable',
		color: '#557c32',
		image: 'images/vegetable.webp',
		alt: 'Dew on layered green cabbage leaves in a field',
		description:
			'Look for Vegetable on the Moshi Moshi label. This is the vegetable-named product in the five-crop range; its singular label name is kept here so you can recognise it on the packaging.',
		readingNote:
			'A crop category is a starting point for identification, not confirmation that a formulation is suitable for every vegetable species or growing stage.'
	},
	{
		id: 'bean',
		name: 'Beans',
		label: 'Bean',
		color: '#457242',
		image: 'images/bean.webp',
		alt: 'Green bean pods hanging among sunlit vine leaves',
		description:
			'Bean is the name shown for the bean category in the Moshi Moshi range. Use that exact label name when comparing a bottle with the product information supplied for it.',
		readingNote:
			'The category name alone does not establish which bean varieties, application methods or growing stages are covered by the formulation.'
	},
	{
		id: 'rice',
		name: 'Rice',
		label: 'Rice Plant',
		color: '#a78621',
		image: 'images/rice.webp',
		alt: 'An arching rice panicle with green and golden grains in morning light',
		description:
			'Rice Plant is the rice-specific label in the Moshi Moshi range. It is shown first in this crop explorer to introduce the range—not as a recommendation over the other products.',
		readingNote:
			'No rice application schedule, dose or yield claim is established by the information available for this website.'
	},
	{
		id: 'flowers',
		name: 'Flowers',
		label: 'Flowers',
		color: '#a84961',
		image: 'images/flowers.webp',
		alt: 'Pink and coral zinnias opening in a green garden',
		description:
			'The Flowers label identifies the flower-named product in the Moshi Moshi range. Keep this name together with the bottle’s own formulation details when reading about the product.',
		readingNote:
			'The flowers pictured are illustrative. They do not establish supported flower species, flowering effects or application instructions.'
	},
	{
		id: 'perennial',
		name: 'Perennial trees',
		label: 'Perennial Tree',
		color: '#436354',
		image: 'images/perennial.webp',
		alt: 'Green citrus fruit growing among glossy orchard leaves',
		description:
			'Perennial Tree is the label name for the perennial-tree category in the Moshi Moshi range. The singular wording is preserved to help you match the product to its packaging.',
		readingNote:
			'The citrus scene is an illustration of the crop category, not a verified list of tree species or evidence of product performance.'
	}
] as const;

export type Crop = (typeof crops)[number];
