<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BlogCard from '#lib/components/blog-card.svelte';
	import { posts, excerpt } from '#lib/blog.js';

	const featured = posts[0];
</script>

<svelte:head>
	<title>Blog | Moshi Moshi</title>
	<meta name="description" content="Explore the Moshi Moshi blog: field notes, crop stories, and seasonal reading. Preview articles with lorem ipsum content." />
</svelte:head>

<div class="container blog-page">
	<header class="blog-intro">
		<h1>Stories from<br />the field.</h1>
		<div><p>A little closer to the crops, the seasons, and the world of Moshi Moshi.</p><p class="sample-note">Sample stories with lorem ipsum content.</p></div>
	</header>
	<article class="featured-story" aria-labelledby="featured-title">
		<a href={resolve('/blog/[slug]', { slug: featured.slug })}>
			<div class="featured-photo"><img src={asset(featured.image)} alt={featured.alt} width="1672" height="941" fetchpriority="high" /></div>
			<div class="featured-copy">
				<h2 id="featured-title">{featured.title}</h2>
				<p class="story-meta">{featured.category} <span aria-hidden="true">·</span> <time datetime={featured.date}>{featured.dateLabel}</time></p>
				<p>{excerpt}</p>
				<span class="featured-action">Read story <ArrowRight size={20} aria-hidden="true" /></span>
			</div>
		</a>
	</article>
	<section class="more-stories" aria-labelledby="more-title">
		<h2 id="more-title">More from the field</h2>
		<div class="blog-grid">{#each posts.slice(1) as post (post.slug)}<BlogCard {post} />{/each}</div>
	</section>
</div>

<style>
	.blog-page { padding-block: 80px 96px; }
	.blog-intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: end; margin-bottom: 56px; }
	h1 { font-family: var(--font-heading); font-size: clamp(48px, 5.5vw, 76px); line-height: 1.1; letter-spacing: -0.03em; font-weight: 400; }
	.blog-intro p { max-width: 38ch; color: var(--field-muted); font-size: 20px; line-height: 1.7; }
	.blog-intro .sample-note { margin-top: 16px; font-size: 14px; }
	.featured-story > a { display: grid; grid-template-columns: 1.2fr 1fr; color: inherit; text-decoration: none; background: var(--field-soft); }
	.featured-photo { overflow: hidden; }
	.featured-photo img { width: 100%; height: 100%; min-height: 420px; object-fit: cover; transition: transform 240ms ease-out; }
	.featured-copy { align-self: center; padding: 48px; }
	h2 { font-family: var(--font-heading); font-size: clamp(30px, 3vw, 42px); font-weight: 400; line-height: 1.2; letter-spacing: -0.025em; }
	.featured-copy > p { margin-top: 24px; color: var(--field-muted); line-height: 1.8; }
	.featured-copy .story-meta { display: flex; flex-wrap: wrap; gap: 4px 8px; margin-top: 16px; font-size: 14px; }
	.featured-action { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; margin-top: 28px; font-size: 16px; text-decoration: underline; text-underline-offset: 0.25em; }
	.featured-story a:hover img { transform: scale(1.035); }
	.featured-story a:hover .featured-action { text-decoration-thickness: 2px; }
	.more-stories { margin-top: 80px; }
	.more-stories h2 { margin-bottom: 36px; font-size: 34px; }
	.blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 32px; }
	@media (max-width: 1100px) { .featured-copy { padding: 32px; } .blog-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 760px) {
		.blog-page { padding-block: 48px 56px; }
		.blog-intro { grid-template-columns: 1fr; gap: 24px; margin-bottom: 36px; }
		h1 { font-size: clamp(42px, 10vw, 60px); }
		.blog-intro p { font-size: 18px; }
		.featured-story > a { grid-template-columns: 1fr; }
		.featured-photo img { min-height: 0; height: auto; aspect-ratio: 1.4; }
		.featured-copy { padding: 28px; }
		.more-stories { margin-top: 48px; }
		.more-stories h2 { font-size: 28px; margin-bottom: 28px; }
		.blog-grid { grid-template-columns: 1fr; gap: 36px; }
	}
	@media (prefers-reduced-motion: reduce) { .featured-photo img { transition: none; } .featured-story a:hover img { transform: none; } }
</style>
