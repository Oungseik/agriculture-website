export const posts = [
	{
		slug: 'a-morning-in-the-fields',
		title: 'A morning in the fields',
		category: 'Field notes',
		image: 'images/landscape.webp',
		alt: 'Sunlight over green fields and misty hills',
		date: '2026-10-10',
		dateLabel: '10 October 2026'
	},
	{
		slug: 'a-closer-look-at-leafy-greens',
		title: 'A closer look at leafy greens',
		category: 'Crop stories',
		image: 'images/vegetable.webp',
		alt: 'Green vegetables growing in the garden',
		date: '2026-10-07',
		dateLabel: '7 October 2026'
	},
	{
		slug: 'through-the-rice-season',
		title: 'Through the rice season',
		category: 'Seasonal stories',
		image: 'images/rice.webp',
		alt: 'Rice plants growing in a sunlit field',
		date: '2026-10-04',
		dateLabel: '4 October 2026'
	},
	{
		slug: 'small-moments-in-the-bean-garden',
		title: 'Small moments in the bean garden',
		category: 'Field notes',
		image: 'images/bean.webp',
		alt: 'Green bean pods among sunlit leaves',
		date: '2026-10-01',
		dateLabel: '1 October 2026'
	},
	{
		slug: 'a-field-in-bloom',
		title: 'A field in bloom',
		category: 'Crop stories',
		image: 'images/flowers.webp',
		alt: 'Colourful flowers blooming in the garden',
		date: '2026-09-28',
		dateLabel: '28 September 2026'
	},
	{
		slug: 'among-the-perennial-trees',
		title: 'Among the perennial trees',
		category: 'Seasonal stories',
		image: 'images/perennial.webp',
		alt: 'Fruit growing among the leaves of perennial trees',
		date: '2026-09-24',
		dateLabel: '24 September 2026'
	}
] as const;

export type BlogPost = (typeof posts)[number];

export const excerpt =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae tellus eget neque consequat malesuada.';

// shortcut: sample articles share lorem ipsum body copy, replace with individual content before publishing real stories.
export const sections = [
	{
		id: 'a-closer-look',
		title: 'A closer look',
		paragraphs: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae tellus eget neque consequat malesuada. Donec posuere, neque sit amet tincidunt interdum, erat lorem suscipit justo, vel feugiat velit sapien non nunc. Integer at lacus vitae augue gravida tincidunt. Sed euismod, purus vel fermentum facilisis, lorem erat dignissim nibh, a interdum sapien neque vitae lectus.',
			'Curabitur eget metus ac nibh tincidunt consequat. Aliquam erat volutpat. Suspendisse potenti. Nulla facilisi. Maecenas sit amet lorem vel enim ullamcorper blandit. Vivamus at velit vitae nisi posuere consequat. Aenean non magna id justo finibus volutpat. Proin feugiat, urna vitae luctus tincidunt, ligula ipsum vulputate augue, vel dapibus ipsum neque sed erat.'
		]
	},
	{
		id: 'through-the-season',
		title: 'Through the growing season',
		paragraphs: [
			'Fusce ac nibh in risus sollicitudin tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam euismod dolor id nibh tincidunt, quis hendrerit turpis interdum. Ut fermentum risus vitae lorem viverra, ut ullamcorper neque vulputate. Phasellus facilisis, neque non placerat commodo, arcu tellus convallis felis, in volutpat metus augue vel justo.',
			'Donec dignissim, massa in ultrices suscipit, arcu orci cursus augue, a faucibus neque erat vel lectus. In hac habitasse platea dictumst. Etiam malesuada leo vitae quam interdum, sed posuere urna viverra. Quisque at lacus eget lectus facilisis suscipit. Morbi luctus purus ut velit consequat, vitae porttitor sapien posuere. Duis quis libero nec lorem mattis tincidunt.'
		]
	},
	{
		id: 'looking-ahead',
		title: 'Looking ahead',
		paragraphs: [
			'Aliquam vitae neque ut lorem tincidunt sollicitudin. Sed non purus eu arcu luctus aliquet. Mauris blandit, felis a feugiat elementum, nunc justo tincidunt ipsum, id ultrices metus lorem eget nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Nam consequat lacus sed sem viverra, eu lacinia neque blandit.',
			'Praesent consequat, neque eget dignissim tincidunt, erat tellus molestie lorem, sed vulputate tortor ligula vitae ante. Nulla eu lectus vitae sapien fermentum tincidunt. Cras at nibh et erat malesuada posuere. Integer ullamcorper, lorem ac tincidunt volutpat, augue sapien consequat nibh, vitae posuere velit risus at lorem. Sed vitae urna at augue feugiat malesuada.'
		]
	}
];
