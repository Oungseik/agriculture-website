<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { Button } from '#lib/components/ui/button/index.js';
	import ProductBottle from '#lib/components/product-bottle.svelte';
	import { crops } from '#lib/crops.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const crop = $derived(data.crop);

	const sections = [
		{ id: 'overview', title: 'Product overview', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae tellus eget neque consequat malesuada. Donec posuere, neque sit amet tincidunt interdum, erat lorem suscipit justo, vel feugiat velit sapien non nunc.' },
		{ id: 'benefits', title: 'Key benefits', copy: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Maecenas vitae ipsum in ligula efficitur fringilla. Nulla facilisi. Aenean euismod, quam vel cursus consequat, metus libero volutpat neque, vitae posuere mi lectus sed lorem.' },
		{ id: 'ingredients', title: 'Ingredients & composition', copy: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Integer at lacus vitae augue gravida tincidunt. Sed euismod, purus vel fermentum facilisis, lorem erat dignissim nibh, a interdum sapien neque vitae lectus.' },
		{ id: 'crops', title: 'Suitable crops & growth stages', copy: 'Quisque vel lectus vitae arcu consectetur tempor. Curabitur dictum sem ut nibh vestibulum, id viverra lectus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
		{ id: 'how-to-use', title: 'How to use', copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat, mi a vulputate malesuada, velit neque finibus elit, eget posuere nisi tortor eu arcu. Suspendisse potenti. Donec eget velit eget arcu dignissim commodo.' },
		{ id: 'application', title: 'Application rates & timing', copy: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Proin tincidunt, magna vitae tincidunt varius, neque dui hendrerit risus, non porttitor justo ipsum vel lorem. Duis vitae neque sed lectus faucibus tincidunt.' },
		{ id: 'compatibility', title: 'Compatibility & mixing', copy: 'Nunc tincidunt lacus in enim consequat, vitae feugiat justo mattis. Etiam nec eros eget libero accumsan hendrerit. Mauris euismod arcu ut lorem blandit, eget faucibus tortor condimentum. Nam aliquet tellus at ligula dictum, vel luctus sapien pretium.' },
		{ id: 'storage', title: 'Storage & handling', copy: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sed eu purus vitae orci interdum tempus. Vivamus suscipit, nunc a feugiat volutpat, lacus felis placerat leo, eget aliquet risus neque eget sem.' }
	];
	const faqs = [
		'Which crops is this product suitable for?',
		'When should I apply this product?',
		'Can I mix it with other agricultural products?',
		'How should I store it after opening?'
	];
</script>

<svelte:head>
	<title>Moshi Moshi {crop.label} | Biostimulant product information</title>
	<meta name="description" content={`Explore Moshi Moshi ${crop.label}. Product overview, ingredients and composition, key benefits, application information, storage, and frequently asked questions.`} />
</svelte:head>

<div class="container">
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<ol>
			<li><a href={resolve('/')}>Home</a><ChevronRight size={14} aria-hidden="true" /></li>
			<li><a href={`${resolve('/')}#range`}>Products</a><ChevronRight size={14} aria-hidden="true" /></li>
			<li><span aria-current="page">{crop.label}</span></li>
		</ol>
	</nav>
	<section class="product-hero" aria-labelledby="product-title">
		<figure class="product-figure">
			<div class="product-photo">
				<img src={asset(crop.image)} alt={crop.alt} width="1024" height="1024" fetchpriority="high" />
				<div class="product-bottle"><ProductBottle label={crop.label} color={crop.color} /></div>
			</div>
			<figcaption>Crop scene and packaging illustration</figcaption>
		</figure>
		<div class="product-summary">
			<h1 id="product-title">{crop.label}<br /><span>biostimulant</span></h1>
			<p class="summary-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae tellus eget neque consequat malesuada. Integer at lacus vitae augue gravida tincidunt.</p>
			<dl>
				<div><dt>Product range</dt><dd>Moshi Moshi</dd></div>
				<div><dt>Crop category</dt><dd>{crop.name}</dd></div>
			</dl>
			<div class="product-actions">
				<Button href="#overview" size="lg">Explore product details <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
				<a class="text-link" href="#how-to-use">How to use <ChevronRight size={17} aria-hidden="true" /></a>
			</div>
		</div>
	</section>
	<div class="product-reading">
		<aside class="contents">
			<nav aria-label="On this page">
				<h2>On this page</h2>
				{#each sections as section (section.id)}
					<a href={`#${section.id}`}>{section.title}</a>
				{/each}
				<a href="#faqs">Frequently asked questions</a>
			</nav>
		</aside>
		<div class="product-sections">
			{#each sections as section (section.id)}
				<section id={section.id} aria-labelledby={`${section.id}-title`} tabindex="-1">
					<h2 id={`${section.id}-title`}>{section.title}</h2>
					<p>{section.copy}</p>
				</section>
			{/each}
			<section id="faqs" aria-labelledby="faqs-title" tabindex="-1">
				<h2 id="faqs-title">Frequently asked questions</h2>
				{#each faqs as question (question)}
					<details>
						<summary>{question}</summary>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit, nunc a feugiat volutpat, lacus felis placerat leo, eget aliquet risus neque eget sem.</p>
					</details>
				{/each}
			</section>
		</div>
	</div>
	<section class="more-products" aria-labelledby="more-title">
		<div class="more-heading"><h2 id="more-title">Explore the rest of the range.</h2><a class="text-link" href={`${resolve('/')}#range`}><ArrowLeft size={17} aria-hidden="true" /> All products</a></div>
		<div class="related-grid">
			{#each crops.filter((item) => item.id !== crop.id) as related (related.id)}
				<a class="related-product" href={resolve('/products/[slug]', { slug: related.id })}>
					<img src={asset(related.image)} alt={related.alt} width="1024" height="1024" loading="lazy" />
					<span>{related.label} <ArrowRight size={18} aria-hidden="true" /></span>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.breadcrumbs { padding-block: 24px; font-size: 14px; color: var(--field-muted); }
	.breadcrumbs ol { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 12px; margin: 0; padding: 0; }
	.breadcrumbs li { display: inline-flex; align-items: center; gap: 12px; min-height: 36px; }
	.breadcrumbs a { text-decoration: none; }
	.breadcrumbs a:hover { text-decoration: underline; }
	.product-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding-block: 12px 64px; }
	.product-figure { margin: 0; }
	.product-photo { position: relative; background: var(--field-soft); }
	.product-photo > img { width: 100%; height: 500px; object-fit: cover; }
	.product-bottle { position: absolute; width: 112px; height: 300px; bottom: 28px; right: 28px; }
	.product-figure figcaption { margin-top: 14px; font-size: 14px; color: var(--field-muted); }
	h1 { font-family: var(--font-heading); font-size: clamp(42px, 4.2vw, 62px); font-weight: 400; line-height: 1.14; letter-spacing: -0.03em; }
	h1 span { color: var(--field-green); font-size: 0.7em; }
	.summary-copy { max-width: 45ch; margin-top: 24px; color: var(--field-muted); font-size: 18px; line-height: 1.8; }
	dl { margin-block: 28px; padding-block: 16px; border-block: 1px solid var(--field-rule); font-size: 16px; }
	dl > div { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding-block: 6px; }
	dt { color: var(--field-muted); }
	dd { margin: 0; }
	.product-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; }
	.product-reading { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 80px; border-top: 1px solid var(--field-rule); padding-block: 56px 80px; }
	.contents nav { position: sticky; top: calc(var(--site-header-height) + 32px); display: flex; flex-direction: column; align-items: flex-start; }
	.contents h2 { font-family: var(--font-sans); font-size: 16px; font-weight: 700; margin-bottom: 16px; }
	.contents a { display: flex; align-items: center; min-height: 44px; padding-block: 8px; font-size: 15px; color: var(--field-muted); text-decoration: none; line-height: 1.4; }
	.contents a:hover { color: var(--field-ink); text-decoration: underline; }
	h2 { font-family: var(--font-heading); font-size: clamp(28px, 2.3vw, 34px); font-weight: 400; line-height: 1.25; letter-spacing: -0.02em; }
	.product-sections > section { padding-block: 36px; border-bottom: 1px solid var(--field-rule); }
	.product-sections > section:first-child { padding-top: 0; }
	.product-sections p { max-width: 68ch; margin-top: 20px; color: var(--field-muted); font-size: 18px; line-height: 1.8; }
	details { border-top: 1px solid var(--field-rule); }
	details:first-of-type { margin-top: 28px; }
	summary { cursor: pointer; padding-block: 20px; font-size: 17px; }
	details p { padding-bottom: 24px; }
	details[open] summary { font-weight: 700; }
	summary::marker { color: var(--field-green); }
	.more-products { padding-bottom: 80px; }
	.more-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 32px; margin-bottom: 32px; }
	.related-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
	.related-product { text-decoration: none; }
	.related-product img { width: 100%; aspect-ratio: 1.5; object-fit: cover; }
	.related-product span { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 52px; margin-top: 4px; font-size: 18px; }
	.related-product span :global(svg) { flex-shrink: 0; }
	.related-product:hover span { text-decoration: underline; }
	@media (max-width: 1100px) {
		.product-hero { gap: 40px; }
		.product-reading { grid-template-columns: 220px minmax(0, 1fr); gap: 48px; }
		.product-photo > img { height: 460px; }
	}
	@media (max-width: 760px) {
		.breadcrumbs { padding-block: 12px 20px; }
		.product-hero { grid-template-columns: 1fr; gap: 28px; padding-block: 0 40px; }
		.product-summary { grid-row: 1; }
		h1 { font-size: clamp(40px, 9vw, 56px); }
		.summary-copy { margin-top: 20px; font-size: 17px; }
		dl { margin-block: 24px; }
		.product-photo > img { height: auto; aspect-ratio: 1.1; }
		.product-bottle { width: 86px; height: 230px; right: 20px; bottom: 20px; }
		.product-reading { grid-template-columns: 1fr; gap: 32px; padding-block: 32px 48px; }
		.contents nav { position: static; flex-direction: row; flex-wrap: wrap; gap: 0 24px; }
		.contents h2 { width: 100%; margin-bottom: 8px; }
		.contents a { font-size: 14px; }
		.product-sections > section { padding-block: 28px; }
		.product-sections p { font-size: 17px; margin-top: 16px; }
		summary { font-size: 16px; }
		.more-products { padding-bottom: 48px; }
		.related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
		.related-product span { font-size: 16px; }
	}
</style>
