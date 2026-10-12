<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { asset } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import ProductBottle from '#lib/components/product-bottle.svelte';
	import { crops, type Crop } from '#lib/crops.js';

	let selected = $state.raw<Crop>(crops[2]);
	let focusImage: HTMLImageElement | undefined;
	let flight: { image: HTMLImageElement; animation: Animation } | undefined;
	let selectionVersion = 0;

	function stopFlight() {
		flight?.animation.cancel();
		flight?.image.remove();
		flight = undefined;
	}

	function captureFocusImage(element: HTMLImageElement) {
		focusImage = element;
		return () => {
			focusImage = undefined;
			stopFlight();
		};
	}

	async function selectCrop(crop: Crop, event: MouseEvent) {
		if (selected.id === crop.id) return;
		const version = ++selectionVersion;
		stopFlight();
		const thumbnail = (event.currentTarget as HTMLButtonElement).querySelector('img');
		const from = thumbnail?.getBoundingClientRect();
		// One state assignment commits the photograph, name, label and destination together.
		selected = crop;
		await tick();
		if (version !== selectionVersion || !from || !focusImage) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const to = focusImage.getBoundingClientRect();
		// Offscreen destinations update immediately; never fly an image through a reading section.
		if (to.bottom <= 0 || to.top >= window.innerHeight || !focusImage.animate) return;
		const image = document.createElement('img');
		image.src = asset(crop.image);
		image.alt = '';
		image.setAttribute('aria-hidden', 'true');
		image.className = 'crop-flight';
		Object.assign(image.style, {
			position: 'fixed',
			left: `${to.left}px`,
			top: `${to.top}px`,
			width: `${to.width}px`,
			height: `${to.height}px`,
			objectFit: 'cover',
			transformOrigin: 'top left',
			pointerEvents: 'none',
			zIndex: '40',
			borderRadius: '3px'
		});
		document.body.append(image);
		const animation = image.animate(
			[
				{
					transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
					opacity: 0.95
				},
				{ transform: 'translate(0, 0) scale(1, 1)', opacity: 1 }
			],
			{ duration: 520, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
		);
		flight = { image, animation };
		animation.onfinish = () => {
			image.remove();
			if (flight?.image === image) flight = undefined;
		};
	}

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		window.addEventListener('scroll', stopFlight, { passive: true });
		window.addEventListener('resize', stopFlight);
		motion.addEventListener('change', stopFlight);
		return () => {
			selectionVersion++;
			stopFlight();
			window.removeEventListener('scroll', stopFlight);
			window.removeEventListener('resize', stopFlight);
			motion.removeEventListener('change', stopFlight);
		};
	});
</script>

<svelte:head>
	<title>Moshi Moshi — A closer look at what you grow</title>
	<meta
		name="description"
		content="Explore the five crop-labeled Moshi Moshi biostimulants: Vegetable, Bean, Rice Plant, Flowers and Perennial Tree. Read product identification notes and what to check before use."
	/>
	<meta name="theme-color" content="#193c2e" />
</svelte:head>

<a class="skip-link" href="#range">Skip to the product range</a>
<header class="site-header" id="top">
	<a class="brand" href="#top" aria-label="Moshi Moshi home">
		<img src={asset('images/sun-mark.webp')} alt="" width="50" height="50" />
		<span>Moshi Moshi</span>
	</a>
	<nav aria-label="Main navigation">
		<a href="#range">The range</a>
		<a href="#about">About</a>
	</nav>
</header>

<main>
	<section class="scene" aria-labelledby="intro-title">
		<img
			class="landscape"
			src={asset('images/landscape.webp')}
			alt=""
			width="1672"
			height="941"
			fetchpriority="high"
		/>
		<div class="scene-inner">
			<div class="introduction">
				<h1 id="intro-title">A closer look<br />at what you grow.</h1>
				<p>Explore Moshi Moshi biostimulants by crop.</p>
				<a class="explore-link" href="#range"
					>Explore the range <ArrowRight size={21} strokeWidth={1.6} /></a
				>
			</div>
			<div class="focus-panel" id="crop-focus" aria-label="Selected crop product">
				<img
					class="focus-image"
					{@attach captureFocusImage}
					src={asset(selected.image)}
					alt={selected.alt}
					width="1024"
					height="1024"
					fetchpriority="high"
				/>
				<div class="product-strip">
					<h2>{selected.label}</h2>
					<p>Moshi Moshi</p>
					<a class="text-link" href={`#product-${selected.id}`}
						>View product <ArrowRight size={19} strokeWidth={1.6} /></a
					>
				</div>
				<div class="hero-bottle">
					<ProductBottle label={selected.label} color={selected.color} />
				</div>
				<span class="packaging-note">Packaging illustration</span>
			</div>
		</div>
	</section>

	<div class="crop-ribbon" id="crop-selector">
		<div class="crop-options" role="group" aria-label="Choose a crop to explore">
			{#each crops as crop (crop.id)}
				<button
					type="button"
					class:chosen={selected.id === crop.id}
					aria-pressed={selected.id === crop.id}
					aria-controls="crop-focus"
					onclick={(event) => selectCrop(crop, event)}
				>
					<img src={asset(crop.image)} alt="" width="1024" height="1024" />
					<span>{crop.name}</span>
				</button>
			{/each}
		</div>
		<p class="sr-only" role="status" aria-atomic="true">
			Selected: Moshi Moshi {selected.label}. View product to read its identification notes.
		</p>
		<noscript
			><p class="no-script">
				Read all five products below. Crop previews are interactive when JavaScript is enabled.
			</p></noscript
		>
	</div>

	<section class="range-section" id="range" aria-labelledby="range-title" tabindex="-1">
		<div class="reading-width">
			<div class="range-intro">
				<h2 id="range-title">Meet the range.</h2>
				<p>
					Five crop labels. One place to get to know them. Start with your crop, then take a closer
					look at the name on the bottle.
				</p>
			</div>
			<nav class="range-index" aria-label="Product reading navigation">
				{#each crops as crop (crop.id)}
					<a href={`#product-${crop.id}`}>{crop.name} <ArrowRight size={17} strokeWidth={1.6} /></a>
				{/each}
			</nav>
			{#each crops as crop (crop.id)}
				<article
					class="crop-article"
					id={`product-${crop.id}`}
					aria-labelledby={`title-${crop.id}`}
					tabindex="-1"
				>
					<div class="article-photo">
						<img src={asset(crop.image)} alt={crop.alt} width="1024" height="1024" loading="lazy" />
						<div class="reading-bottle">
							<ProductBottle label={crop.label} color={crop.color} />
						</div>
					</div>
					<div class="article-copy">
						<h3 id={`title-${crop.id}`}>{crop.label}</h3>
						<p>{crop.description}</p>
						<dl>
							<div>
								<dt>Range</dt>
								<dd>Moshi Moshi</dd>
							</div>
							<div>
								<dt>Product category</dt>
								<dd>Biostimulant</dd>
							</div>
							<div>
								<dt>Label to look for</dt>
								<dd>{crop.label}</dd>
							</div>
						</dl>
						<p class="reading-note">{crop.readingNote}</p>
						<a class="text-link" href="#before-use"
							>What to check before use <ArrowRight size={18} strokeWidth={1.6} /></a
						>
					</div>
				</article>
			{/each}
			<p class="image-note">
				Crop scenes and bottles are illustrations. Bottle shapes, label colours and the sun mark are
				not reproductions of original packaging.
			</p>
		</div>
	</section>

	<section
		class="before-use reading-width"
		id="before-use"
		aria-labelledby="before-title"
		tabindex="-1"
	>
		<div>
			<h2 id="before-title">Before it goes<br />into your field.</h2>
			<p>
				Recognising a product is the first step. Knowing how to use it needs the information for
				that exact formulation.
			</p>
		</div>
		<div class="use-copy">
			<p>
				This website identifies the range; it is not an application guide. Ingredients, rates,
				methods, timing, safety instructions and pack sizes have not been confirmed here.
			</p>
			<h3>Read the bottle and its documentation</h3>
			<ul>
				<li>Match the crop label and formulation to the product you have.</li>
				<li>Check the official directions for the crop, rate, method and timing.</li>
				<li>Read the safety, handling, storage and compatibility information.</li>
				<li>
					If those details are missing or unclear, ask the product supplier or a qualified local
					adviser before applying it.
				</li>
			</ul>
			<p class="reading-note">
				A crop label or an illustrative scene is not evidence of suitability, efficacy or a yield
				improvement.
			</p>
		</div>
	</section>

	<section class="about-section" id="about" aria-labelledby="about-title" tabindex="-1">
		<div class="reading-width about-layout">
			<div>
				<h2 id="about-title">About Moshi Moshi.</h2>
				<p>A crop-first introduction to the range.</p>
			</div>
			<div class="about-copy">
				<p>
					Moshi Moshi is presented in the supplied promotional material as a biostimulant range,
					with five distinct crop labels: Vegetable, Bean, Rice Plant, Flowers and Perennial Tree.
				</p>
				<p>
					Here, those names lead the way. The site helps you recognise each product and separates
					identification from application advice and performance claims.
				</p>
				<p>
					Origin, certifications, manufacturer details, availability and product performance have
					not been independently verified. Promotional badges are not treated as proof of those
					claims.
				</p>
				<a class="text-link" href="#range"
					>Return to the range <ArrowRight size={18} strokeWidth={1.6} /></a
				>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="footer-inner">
		<a class="brand footer-brand" href="#top"
			><img src={asset('images/sun-mark.webp')} alt="" width="40" height="40" /><span
				>Moshi Moshi</span
			></a
		>
		<nav aria-label="Footer navigation">
			<a href="#range">The range</a><a href="#before-use">Before use</a><a href="#about">About</a>
		</nav>
		<a class="back-top" href="#top">Back to the fields <ArrowUp size={18} strokeWidth={1.6} /></a>
		<p>Product identification, with room for nature.</p>
		<p class="footer-note">
			An informational site. No online purchasing or application recommendations.
		</p>
	</div>
</footer>

<style>
	.skip-link {
		position: fixed;
		top: 12px;
		left: 12px;
		transform: translateY(-160%);
		z-index: 50;
		background: white;
		padding: 12px 20px;
	}
	.skip-link:focus {
		transform: translateY(0);
	}
	.site-header {
		height: 62px;
		padding-inline: 6.7% 7.8%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 13px;
		color: var(--field-ink);
		text-decoration: none;
		font-weight: 700;
		font-size: 30px;
		line-height: 1;
	}
	.brand img {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}
	.site-header nav {
		display: flex;
		gap: 54px;
	}
	.site-header nav a {
		text-decoration: none;
		padding-block: 12px;
		font-size: 19px;
	}
	nav a:hover {
		text-decoration: underline;
	}
	.scene {
		position: relative;
		min-height: clamp(580px, 44.08vw, 740px);
		isolation: isolate;
		background: #d5e4e4;
	}
	.landscape {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 8%;
		z-index: -1;
	}
	.scene-inner {
		margin-left: 10.68%;
		width: 81.52%;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 39.22%;
		gap: 10%;
		padding-block: 42px 60px;
	}
	.introduction {
		padding-top: 51px;
	}
	h1 {
		font-family: var(--font-heading);
		font-size: clamp(48px, 4.49vw, 74px);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.025em;
		text-wrap: nowrap;
	}
	.introduction > p {
		font-size: clamp(21px, 1.76vw, 28px);
		line-height: 1.3;
		margin-top: 8px;
	}
	.explore-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 18px;
		color: white;
		background: var(--field-green);
		border-radius: 999px;
		min-height: 50px;
		padding: 10px 28px;
		font-weight: 700;
		font-size: 19px;
		line-height: 1.3;
		text-decoration: none;
		margin-top: 18px;
		transition: background 140ms ease-out;
	}
	.explore-link:hover {
		background: var(--field-green-deep);
	}
	.focus-panel {
		position: relative;
		background: white;
		border-radius: 3px;
		box-shadow: 0 5px 20px #193c2e20;
	}
	.focus-image {
		display: block;
		width: 100%;
		aspect-ratio: 491 / 428;
		height: auto;
		object-fit: cover;
		border-radius: 3px 3px 0 0;
	}
	.product-strip {
		min-height: 145px;
		padding: 17px 26px 20px;
	}
	.product-strip h2 {
		max-width: calc(100% - 110px);
		font-size: 33px;
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.025em;
		text-wrap: initial;
	}
	.product-strip > p {
		color: var(--field-muted);
		font-size: 20px;
		line-height: 1.3;
	}
	.text-link {
		display: inline-flex;
		align-items: center;
		gap: 13px;
		color: var(--field-green-deep);
		text-decoration: none;
		border-bottom: 1px solid currentColor;
		font-size: 19px;
		line-height: 1.5;
	}
	.text-link:hover {
		color: var(--field-green);
		border-bottom-width: 2px;
		margin-bottom: -1px;
	}
	.product-strip .text-link {
		margin-top: 6px;
	}
	.hero-bottle {
		position: absolute;
		right: 25px;
		bottom: 23px;
		width: 107px;
		height: 218px;
	}
	.packaging-note {
		position: absolute;
		right: 12px;
		bottom: 5px;
		color: var(--field-muted);
		font-size: 11px;
		line-height: 1.2;
	}
	.crop-ribbon {
		padding: 22px 5.08% 27px;
		background: white;
	}
	.crop-options {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 28px;
	}
	.crop-options button {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 8px;
		background: none;
		border: 0;
		padding: 0 0 2px;
		color: var(--field-ink);
		border-bottom: 3px solid transparent;
		font-size: 19px;
		line-height: 1.5;
	}
	.crop-options button img {
		display: block;
		width: 100%;
		height: 94px;
		object-fit: cover;
		border-radius: 4px;
		transition: filter 140ms ease-out;
	}
	.crop-options button:hover img {
		filter: brightness(0.92);
	}
	.crop-options button.chosen {
		border-color: var(--field-green);
	}
	.no-script {
		margin-top: 16px;
		text-align: center;
		font-size: 16px;
	}
	.reading-width {
		max-width: 1208px;
		width: 78.64%;
		margin-inline: auto;
	}
	.range-section {
		background: var(--field-paper);
		padding-block: 40px 78px;
	}
	.range-intro h2,
	.before-use h2,
	.about-section h2 {
		font-family: var(--font-heading);
		font-size: clamp(34px, 3.06vw, 48px);
		font-weight: 400;
		line-height: 1.15;
		letter-spacing: -0.025em;
	}
	.range-intro > p {
		max-width: 650px;
		margin-top: 22px;
		color: var(--field-muted);
		font-size: 21px;
	}
	.range-index {
		display: flex;
		flex-wrap: wrap;
		gap: 14px 28px;
		margin-block: 30px 52px;
	}
	.range-index a {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		color: var(--field-green-deep);
		text-decoration: none;
		padding-block: 6px;
	}
	.crop-article {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
		gap: 70px;
		padding-block: 52px;
		border-top: 1px solid var(--field-rule);
		align-items: center;
		scroll-margin-top: 32px;
	}
	.article-photo {
		position: relative;
	}
	.article-photo > img {
		display: block;
		width: 100%;
		aspect-ratio: 1.35;
		height: auto;
		object-fit: cover;
		border-radius: 3px;
	}
	.reading-bottle {
		position: absolute;
		right: 16px;
		bottom: -14px;
		width: 88px;
		height: 180px;
	}
	.article-copy h3 {
		font-family: var(--font-heading);
		font-size: 35px;
		font-weight: 400;
		line-height: 1.2;
		margin-bottom: 20px;
	}
	.article-copy > p {
		max-width: 66ch;
	}
	dl {
		margin-block: 22px;
		font-size: 16px;
	}
	dl > div {
		display: grid;
		grid-template-columns: 155px 1fr;
		gap: 16px;
		padding-block: 7px;
	}
	dt {
		color: var(--field-muted);
	}
	dd {
		margin: 0;
		font-weight: 700;
	}
	.reading-note {
		color: var(--field-muted);
		font-size: 16px;
		line-height: 1.65;
	}
	.article-copy .text-link {
		margin-top: 20px;
		font-size: 17px;
	}
	.image-note {
		max-width: 70ch;
		color: var(--field-muted);
		font-size: 14px;
		margin-top: 28px;
	}
	.before-use {
		padding-block: 94px;
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 90px;
		scroll-margin-top: 30px;
	}
	.before-use > div > p {
		margin-top: 24px;
		max-width: 60ch;
	}
	.before-use .use-copy > p:first-child {
		margin-top: 0;
	}
	.use-copy h3 {
		font-size: 22px;
		line-height: 1.3;
		margin-top: 30px;
	}
	.use-copy ul {
		margin: 18px 0 22px;
		padding-left: 21px;
	}
	.use-copy li {
		padding-left: 6px;
		margin-bottom: 12px;
	}
	.use-copy li::marker {
		color: var(--field-green);
	}
	.about-section {
		background: #edf1e8;
		padding-block: 84px;
		scroll-margin-top: 0;
	}
	.about-layout {
		display: grid;
		grid-template-columns: 0.85fr 1.15fr;
		gap: 90px;
	}
	.about-layout > div > p {
		margin-top: 22px;
	}
	.about-layout .about-copy > p:first-child {
		margin-top: 0;
	}
	.about-copy .text-link {
		margin-top: 30px;
	}
	footer {
		padding-block: 42px;
		background: white;
	}
	.footer-inner {
		width: 86.6%;
		max-width: 1330px;
		margin-inline: auto;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 26px 50px;
		align-items: center;
	}
	.footer-brand {
		font-size: 25px;
	}
	.footer-brand img {
		width: 40px;
		height: 40px;
	}
	footer nav {
		display: flex;
		gap: 25px;
		font-size: 16px;
	}
	footer nav a {
		text-decoration: none;
	}
	.back-top {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
		text-decoration: none;
	}
	.footer-inner > p {
		font-size: 15px;
		color: var(--field-muted);
	}
	.footer-note {
		grid-column: 2 / 4;
		text-align: right;
	}
	#range {
		scroll-margin-top: 0;
	}
	@media (max-width: 1100px) {
		.scene-inner {
			margin-left: 7%;
			width: 86%;
			gap: 6%;
			grid-template-columns: minmax(0, 1fr) 41%;
		}
		h1 {
			font-size: clamp(42px, 4.5vw, 52px);
		}
		.introduction > p {
			font-size: 22px;
		}
		.product-strip {
			padding-inline: 20px;
		}
		.product-strip h2 {
			font-size: 28px;
		}
		.hero-bottle {
			right: 15px;
			width: 85px;
			height: 178px;
		}
		.crop-options {
			gap: 18px;
		}
		.crop-options button {
			font-size: 17px;
		}
		.reading-width {
			width: 86%;
		}
		.crop-article {
			gap: 40px;
		}
		.before-use,
		.about-layout {
			gap: 48px;
		}
		.footer-inner {
			column-gap: 24px;
		}
	}
	@media (max-width: 760px) {
		.site-header {
			height: 72px;
			padding-inline: 6%;
		}
		.brand {
			font-size: 23px;
			gap: 8px;
		}
		.brand img {
			width: 36px;
			height: 36px;
		}
		.site-header nav {
			gap: 22px;
		}
		.site-header nav a {
			font-size: 16px;
		}
		.scene {
			min-height: 0;
		}
		.landscape {
			object-position: 38% center;
		}
		.scene-inner {
			width: 88%;
			margin-inline: auto;
			padding-block: 35px 38px;
			display: flex;
			flex-direction: column;
			gap: 34px;
		}
		.introduction {
			padding-top: 0;
		}
		h1 {
			font-size: clamp(35px, 7.9vw, 57px);
			line-height: 1.08;
			text-wrap: initial;
		}
		.introduction > p {
			font-size: 20px;
			max-width: 31ch;
			margin-top: 14px;
		}
		.explore-link {
			min-height: 48px;
			font-size: 17px;
			padding-inline: 25px;
		}
		.focus-panel {
			width: 100%;
			max-width: 490px;
			align-self: center;
		}
		.focus-image {
			aspect-ratio: 1.4;
		}
		.product-strip {
			min-height: 142px;
			padding: 15px 20px 21px;
		}
		.product-strip h2 {
			font-size: 28px;
			max-width: calc(100% - 94px);
		}
		.product-strip > p {
			font-size: 18px;
		}
		.product-strip .text-link {
			font-size: 17px;
		}
		.hero-bottle {
			width: 90px;
			height: 184px;
			right: 16px;
			bottom: 24px;
		}
		.crop-ribbon {
			padding: 25px 6% 28px;
		}
		.crop-options {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 19px 15px;
		}
		.crop-options button {
			gap: 7px;
			font-size: 15px;
			line-height: 1.3;
		}
		.crop-options button img {
			height: 65px;
		}
		.crop-options button:last-child {
			grid-column: span 2;
		}
		.reading-width {
			width: 88%;
		}
		.range-section {
			padding-block: 38px 50px;
		}
		.range-intro > p {
			font-size: 18px;
			margin-top: 18px;
		}
		.range-index {
			gap: 10px 22px;
			margin-block: 24px 30px;
			font-size: 16px;
		}
		.crop-article {
			grid-template-columns: 1fr;
			gap: 34px;
			padding-block: 36px;
		}
		.article-photo > img {
			aspect-ratio: 1.5;
		}
		.reading-bottle {
			height: 156px;
			width: 76px;
			bottom: -12px;
		}
		.article-copy h3 {
			font-size: 30px;
			margin-bottom: 16px;
		}
		.article-copy > p {
			font-size: 17px;
		}
		dl > div {
			grid-template-columns: 135px 1fr;
			gap: 10px;
		}
		.before-use {
			padding-block: 52px;
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.before-use h2 br {
			display: none;
		}
		.before-use > div > p {
			margin-top: 18px;
		}
		.about-section {
			padding-block: 52px;
		}
		.about-layout {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		footer {
			padding-block: 32px;
		}
		.footer-inner {
			width: 88%;
			grid-template-columns: 1fr;
			gap: 24px;
		}
		footer nav {
			flex-wrap: wrap;
			gap: 22px;
		}
		.footer-note {
			grid-column: auto;
			text-align: left;
		}
	}
	@media (max-width: 380px) {
		.brand {
			font-size: 20px;
		}
		.site-header nav {
			gap: 15px;
		}
		.site-header nav a {
			font-size: 15px;
		}
		.product-strip h2 {
			font-size: 24px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.explore-link,
		.crop-options button img {
			transition: none;
		}
	}
</style>
