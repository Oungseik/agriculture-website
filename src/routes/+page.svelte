<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { Button } from '#lib/components/ui/button/index.js';
	import ProductBottle from '#lib/components/product-bottle.svelte';
	import { crops } from '#lib/crops.js';
	import BlogCard from '#lib/components/blog-card.svelte';
	import { posts } from '#lib/blog.js';
</script>

<svelte:head>
	<title>Moshi Moshi | A closer look at what you grow</title>
	<meta name="description" content="Discover the Moshi Moshi biostimulant range for vegetables, beans, rice, flowers, and perennial trees, and explore stories from the field on our blog." />
</svelte:head>

<section class="hero" aria-labelledby="intro-title">
	<div class="hero-media" data-page-image data-transition-image={resolve('/')}>
		<img class="hero-background" src={asset('images/landscape.webp')} alt="" width="1672" height="941" fetchpriority="high" />
	</div>
	<div class="hero-content container">
		<div class="hero-copy">
			<h1 id="intro-title">A closer look at<br />what you grow.</h1>
			<p>Every field starts with a crop. Get to know the Moshi Moshi biostimulant range, one crop at a time.</p>
			<div class="hero-actions">
				<Button href="#range" variant="secondary" size="lg">Explore our products <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
				<a class="text-link" href="#about">Meet Moshi Moshi <ArrowUpRight size={18} aria-hidden="true" /></a>
			</div>
		</div>
	</div>
</section>

<section class="range-section container" id="range" aria-labelledby="range-title" tabindex="-1">
	<div class="section-intro">
		<h2 id="range-title">Different crops.<br />One Moshi Moshi.</h2>
		<p>Find your crop and take a closer look. Explore each product’s ingredients, benefits, and application information on its own page.</p>
	</div>
	<div class="product-grid">
		{#each crops as crop (crop.id)}
			<a class="product-link" id={`product-${crop.id}`} href={resolve('/products/[slug]', { slug: crop.id })} aria-label={`Explore Moshi Moshi ${crop.label}`}>
				<div class="product-visual" data-transition-image={resolve('/products/[slug]', { slug: crop.id })}>
					<img class="crop-photo" src={asset(crop.image)} alt={crop.alt} width="1024" height="1024" loading="lazy" />
					<div class="bottle-position"><ProductBottle label={crop.label} color={crop.color} /></div>
				</div>
				<div class="product-title"><h3>{crop.label}</h3><ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" /></div>
				<p>Biostimulant</p>
				<span class="product-action">Explore product <ArrowRight size={17} aria-hidden="true" /></span>
			</a>
		{/each}
	</div>
</section>

<section class="about-section" id="about" aria-labelledby="about-title" tabindex="-1">
	<div class="container about-layout">
		<div class="about-photo">
			<img src={asset('images/bean.webp')} alt="Green bean pods growing among sunlit leaves" width="1024" height="1024" loading="lazy" />
		</div>
		<div class="about-copy">
			<h2 id="about-title">From the field.<br />For the grower.</h2>
			<h3>Get to know Moshi Moshi</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae tellus eget neque consequat malesuada. Donec posuere, neque sit amet tincidunt interdum, erat lorem suscipit justo, vel feugiat velit sapien non nunc.</p>
			<p>Integer at lacus vitae augue gravida tincidunt. Sed euismod, purus vel fermentum facilisis, lorem erat dignissim nibh, a interdum sapien neque vitae lectus.</p>
			<a class="text-link" href="#range">Discover the range <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
	</div>
</section>

<section class="blog-section container" id="blog" aria-labelledby="blog-title" tabindex="-1">
	<div class="section-intro">
		<h2 id="blog-title">There’s more<br />to the field.</h2>
		<div class="blog-intro-copy"><p>Explore our blog for field notes, crop stories, and a little seasonal inspiration.</p><a class="text-link" href={resolve('/blog')}>Explore the blog <ArrowRight size={18} aria-hidden="true" /></a></div>
	</div>
	<div class="blog-grid">{#each posts.slice(0, 3) as post (post.slug)}<BlogCard {post} />{/each}</div>
</section>

<style>
	.blog-section { padding-block: 96px; }
	.blog-intro-copy p { max-width: 48ch; color: var(--field-muted); line-height: 1.7; }
	.blog-intro-copy .text-link { margin-top: 16px; }
	.blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
	.hero { position: relative; background: var(--field-ink); color: var(--field-paper); --secondary: var(--field-paper); --secondary-foreground: var(--field-ink); --ring: var(--field-paper); }
	.hero-media { position: absolute; inset: 0; overflow: hidden; }
	.hero-background { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 58%; }
	.hero-media::before { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, color-mix(in srgb, var(--field-ink) 82%, transparent) 0%, color-mix(in srgb, var(--field-ink) 76%, transparent) 44%, color-mix(in srgb, var(--field-ink) 42%, transparent) 75%, color-mix(in srgb, var(--field-ink) 22%, transparent) 100%); }
	.hero-content { position: relative; z-index: 2; display: flex; align-items: center; min-height: clamp(560px, 46vw, 680px); padding-block: 72px; }
	.hero-copy { max-width: 780px; view-transition-name: home-intro; }
	h1 { font-family: var(--font-heading); font-size: clamp(52px, 6vw, 88px); font-weight: 400; line-height: 1.08; letter-spacing: -0.03em; text-wrap: initial; }
	.hero-copy > p { max-width: 43ch; margin-top: 28px; color: var(--field-paper); font-size: 20px; line-height: 1.65; }
	.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 20px 32px; margin-top: 36px; }
	.hero .text-link { color: var(--field-paper); text-decoration-color: var(--field-on-dark-muted); }
	.hero .text-link:hover { text-decoration-thickness: 2px; }
	.hero :global(:focus-visible) { outline: 3px solid var(--field-paper); outline-offset: 5px; }
	.range-section { padding-block: 96px; }
	.section-intro { display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 64px; margin-bottom: 44px; }
	h2 { font-family: var(--font-heading); font-size: clamp(34px, 3.2vw, 48px); font-weight: 400; line-height: 1.2; letter-spacing: -0.025em; }
	.section-intro > p { max-width: 48ch; color: var(--field-muted); line-height: 1.7; }
	.product-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; }
	.product-link { min-width: 0; color: var(--field-ink); text-decoration: none; scroll-margin-top: 32px; }
	.product-visual { position: relative; background: var(--field-soft); overflow: hidden; }
	.crop-photo { width: 100%; aspect-ratio: 0.85; object-fit: cover; transition: transform 240ms ease-out; }
	.product-link:hover .crop-photo { transform: scale(1.035); }
	.bottle-position { position: absolute; width: 64px; height: 168px; right: 14px; bottom: 14px; }
	.product-title { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-top: 20px; }
	h3 { font-size: 23px; font-family: var(--font-heading); font-weight: 400; line-height: 1.25; letter-spacing: -0.02em; text-wrap: initial; }
	.product-title :global(svg) { flex-shrink: 0; margin-top: 4px; }
	.product-link > p { color: var(--field-muted); font-size: 15px; margin-top: 8px; }
	.product-action { display: inline-flex; align-items: center; gap: 12px; margin-top: 20px; min-height: 44px; font-size: 15px; }
	.product-link:hover .product-action { text-decoration: underline; }
	.about-section { background: var(--field-soft); padding-block: 72px; }
	.about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 88px; align-items: center; }
	.about-photo img { width: 100%; height: 460px; object-fit: cover; }
	.about-copy h3 { margin-top: 28px; font-family: var(--font-sans); font-size: 18px; font-weight: 700; }
	.about-copy p { max-width: 55ch; margin-top: 16px; color: var(--field-muted); font-size: 17px; line-height: 1.8; }
	.about-copy .text-link { margin-top: 28px; }
	@media (max-width: 1100px) {
		.product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 36px 24px; }
		.crop-photo { aspect-ratio: 1.1; }
		.about-layout { gap: 48px; }
	}
	@media (max-width: 760px) {
		.blog-section { padding-block: 56px; }
		.blog-grid { grid-template-columns: 1fr; gap: 36px; }
		.hero-media::before { background: color-mix(in srgb, var(--field-ink) 74%, transparent); }
		.hero-background { object-position: 58% center; }
		.hero-content { min-height: 560px; padding-block: 64px; }
		h1 { font-size: clamp(36px, 9vw, 64px); line-height: 1.12; }
		.hero-copy > p { font-size: 18px; max-width: 36ch; margin-top: 24px; }
		.hero-actions { margin-top: 28px; gap: 16px 24px; }
		.range-section { padding-block: 56px; }
		.section-intro { grid-template-columns: 1fr; gap: 20px; margin-bottom: 32px; }
		.section-intro > p { font-size: 17px; }
		.product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 20px; }
		.crop-photo { aspect-ratio: 0.85; }
		.bottle-position { width: 48px; height: 128px; right: 10px; bottom: 10px; }
		.product-title { margin-top: 16px; gap: 4px; }
		h3 { font-size: 21px; }
		.product-title :global(svg) { width: 18px; height: 18px; }
		.product-action { gap: 8px; margin-top: 8px; }
		.about-section { padding-block: 40px 48px; }
		.about-layout { grid-template-columns: 1fr; gap: 32px; }
		.about-photo img { height: auto; aspect-ratio: 1.3; }
	}
	@media (prefers-reduced-motion: reduce) {
		.crop-photo { transition: none; }
		.product-link:hover .crop-photo { transform: none; }
	}
</style>
