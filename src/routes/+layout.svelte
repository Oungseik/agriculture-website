<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { crops } from '#lib/crops.js';
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/webp" href={asset('images/sun-mark.webp')} />
	<meta name="theme-color" content="#193c2e" />
</svelte:head>

<div id="top"></div>
<a class="skip-link" href="#main-content">Skip to content</a>

<header class="site-header">
	<div class="container header-inner">
		<a class="brand" href={resolve('/')} aria-label="Moshi Moshi home">
			<img src={asset('images/sun-mark.webp')} alt="" width="44" height="44" />
			<span>Moshi Moshi</span>
		</a>
		<nav aria-label="Main navigation">
			<a class="home-link" href={resolve('/')} aria-current={page.route.id === '/' ? 'page' : undefined}>Home</a>
			<a href={`${resolve('/')}#range`} aria-current={page.route.id === '/products/[slug]' ? 'page' : undefined}>Products</a>
			<a href={resolve('/blog')} aria-current={page.route.id === '/blog' ? 'page' : page.route.id === '/blog/[slug]' ? 'true' : undefined}>Blog</a>
			<a href={`${resolve('/')}#about`}>About</a>
		</nav>
	</div>
</header>

<main id="main-content" tabindex="-1">
	{@render children()}
</main>

<footer class="site-footer">
	<div class="container">
		<div class="footer-main">
			<div class="footer-intro">
				<a class="brand" href={resolve('/')}>
					<img src={asset('images/sun-mark.webp')} alt="" width="44" height="44" />
					<span>Moshi Moshi</span>
				</a>
				<p>A closer look at<br />what you grow.</p>
			</div>
			<nav aria-label="Product navigation">
				<h2>Our products</h2>
				{#each crops as crop (crop.id)}
					<a href={resolve('/products/[slug]', { slug: crop.id })}>{crop.label}</a>
				{/each}
			</nav>
			<nav aria-label="Explore Moshi Moshi">
				<h2>Explore</h2>
				<a href={`${resolve('/')}#about`}>About Moshi Moshi</a>
				<a href={resolve('/blog')}>Our blog</a>
				<a href={`${resolve('/')}#range`}>Find your crop <ArrowUpRight size={16} aria-hidden="true" /></a>
				<a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a>
			</nav>
		</div>
		<div class="footer-bottom">
			<p>Moshi Moshi · Biostimulants</p>
			<p>Crop photography and packaging are illustrative.</p>
		</div>
	</div>
</footer>

{#if import.meta.env.DEV}
	{#await import('svelte-grab') then { SvelteDevKit }}
		<SvelteDevKit />
	{/await}
{/if}

<style>
	.skip-link { position: fixed; top: 12px; left: 12px; z-index: 50; transform: translateY(-180%); padding: 12px 20px; background: var(--background); }
	.skip-link:focus { transform: translateY(0); }
	.site-header { position: sticky; top: 0; z-index: 10; background: var(--background); border-bottom: 1px solid var(--field-rule); }
	.header-inner { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
	.brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; font-size: 26px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.2; }
	.brand img { width: 42px; height: 42px; object-fit: contain; }
	.site-header .brand { min-height: 44px; gap: 10px; font-size: 22px; white-space: nowrap; }
	.site-header .brand img { width: 32px; height: 32px; }
	.site-header nav { display: flex; align-items: center; gap: 24px; }
	.site-header nav a { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; text-decoration: none; text-underline-offset: 0.4em; font-size: 15px; }
	.site-header nav a:hover { color: var(--field-green); }
	.site-header nav a[aria-current] { text-decoration: underline; text-decoration-color: var(--field-green); text-decoration-thickness: 2px; }
	nav a:hover { text-decoration: underline; }
	.site-footer { padding-block: 64px 24px; background: var(--field-ink); color: var(--field-paper); }
	.footer-main { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 64px; padding-bottom: 56px; }
	.footer-intro > p { margin-top: 28px; font-family: var(--font-heading); font-size: 30px; line-height: 1.35; }
	.site-footer nav { display: flex; flex-direction: column; align-items: flex-start; }
	.site-footer nav h2 { margin-bottom: 12px; font-size: 16px; font-weight: 700; }
	.site-footer nav a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: var(--field-on-dark-muted); font-size: 16px; text-decoration: none; }
	.footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 24px; padding-top: 24px; border-top: 1px solid var(--field-dark-rule); font-size: 14px; color: var(--field-on-dark-muted); }
	.site-footer :global(:focus-visible) { outline-color: var(--field-on-dark-muted); }
	@media (max-width: 760px) {
		.header-inner { min-height: 60px; gap: 8px 16px; flex-wrap: wrap; padding-block: 8px; }
		.brand { font-size: 21px; gap: 8px; }
		.brand img { width: 32px; height: 32px; }
		.site-header .brand { font-size: 20px; gap: 8px; }
		.site-header .brand img { width: 28px; height: 28px; }
		.site-header nav { gap: 16px; }
		.site-header nav a { font-size: 14px; }
		.site-header nav .home-link { display: none; }
		.site-footer { padding-top: 44px; }
		.footer-main { grid-template-columns: 1fr 1fr; gap: 36px 24px; padding-bottom: 36px; }
		.footer-intro { grid-column: 1 / -1; }
		.footer-intro > p { font-size: 28px; margin-top: 20px; }
		.site-footer nav a { font-size: 15px; }
	}
	@media (max-width: 360px) {
		.brand { font-size: 19px; }
		.site-header .brand { font-size: 19px; }
		.site-header nav { gap: 14px; }
	}
</style>
