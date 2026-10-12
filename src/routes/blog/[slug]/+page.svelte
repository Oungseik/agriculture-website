<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BlogCard from '#lib/components/blog-card.svelte';
	import { posts, sections, excerpt } from '#lib/blog.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = $derived(data.post);
	const related = $derived(posts.filter((story) => story.slug !== post.slug).slice(0, 3));
</script>

<svelte:head>
	<title>{post.title} | Moshi Moshi Blog</title>
	<meta name="description" content={`${post.title}. A sample Moshi Moshi blog story with lorem ipsum content.`} />
</svelte:head>

<article class="container article-page">
	<header class="article-header">
		<h1>{post.title}</h1>
		<p class="article-meta">{post.category} <span aria-hidden="true">·</span> <time datetime={post.date}>{post.dateLabel}</time></p>
		<p class="article-intro">{excerpt}</p>
	</header>
	<figure class="article-photo">
		<img src={asset(post.image)} alt={post.alt} width={post.image === 'images/landscape.webp' ? 1672 : 1024} height={post.image === 'images/landscape.webp' ? 941 : 1024} fetchpriority="high" />
		<figcaption>Illustrative crop photography. Sample article with lorem ipsum content.</figcaption>
	</figure>
	<div class="reading-layout">
		<nav class="article-contents" aria-label="In this story">
			<h2>In this story</h2>
			{#each sections as section (section.id)}<a href={`#${section.id}`}>{section.title}</a>{/each}
		</nav>
		<div class="article-body">
			{#each sections as section (section.id)}
				<section id={section.id} aria-labelledby={`${section.id}-title`} tabindex="-1">
					<h2 id={`${section.id}-title`}>{section.title}</h2>
					{#each section.paragraphs as paragraph, index (paragraph)}
						<p>{paragraph}</p>
						{#if post.slug === 'a-morning-in-the-fields' && section.id === 'through-the-season' && index === 0}
							<div class="article-gallery">
								<figure>
									<img src={asset('images/vegetable.webp')} alt="Green vegetables growing in the garden" width="1024" height="1024" loading="lazy" />
									<figcaption>A closer look at leafy greens. Illustrative crop photography.</figcaption>
								</figure>
								<figure>
									<img src={asset('images/bean.webp')} alt="Green bean pods among sunlit leaves" width="1024" height="1024" loading="lazy" />
									<figcaption>Small details in the bean garden. Illustrative crop photography.</figcaption>
								</figure>
							</div>
						{/if}
					{/each}
				</section>
			{/each}
			<a class="text-link" href={resolve('/blog')}>Back to all stories <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
	</div>
</article>

<section class="related-section" aria-labelledby="related-title">
	<div class="container">
		<div class="related-intro"><h2 id="related-title">Keep exploring</h2><a class="text-link" href={resolve('/blog')}>View all stories <ArrowRight size={18} aria-hidden="true" /></a></div>
		<div class="related-grid">{#each related as story (story.slug)}<BlogCard post={story} />{/each}</div>
	</div>
</section>

<style>
	.article-page { padding-block: 40px 80px; }
	.article-header { max-width: 900px; margin-inline: auto; text-align: center; }
	h1 { font-family: var(--font-heading); font-size: clamp(42px, 4.8vw, 68px); font-weight: 400; line-height: 1.15; letter-spacing: -0.03em; }
	.article-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; margin-top: 24px; color: var(--field-muted); font-size: 15px; }
	.article-intro { max-width: 56ch; margin: 24px auto 0; color: var(--field-muted); font-size: 21px; line-height: 1.7; }
	.article-photo { margin-block: 48px 64px; }
	.article-photo img { width: 100%; height: clamp(300px, 36vw, 480px); object-fit: cover; background: var(--field-soft); }
	figcaption { margin-top: 12px; color: var(--field-muted); font-size: 14px; }
	.reading-layout { display: grid; grid-template-columns: 220px minmax(0, 68ch); justify-content: center; gap: 80px; align-items: start; }
	.article-contents { position: sticky; top: calc(var(--site-header-height) + 32px); display: flex; flex-direction: column; align-items: flex-start; }
	.article-contents h2 { margin-bottom: 12px; font-family: var(--font-sans); font-size: 16px; font-weight: 700; }
	.article-contents a { display: flex; align-items: center; min-height: 44px; color: var(--field-muted); font-size: 16px; text-decoration: none; }
	.article-contents a:hover { color: var(--field-green); text-decoration: underline; }
	.article-body section { padding-bottom: 36px; }
	.article-body section + section { padding-top: 36px; border-top: 1px solid var(--field-rule); }
	h2 { font-family: var(--font-heading); font-size: 34px; font-weight: 400; line-height: 1.25; letter-spacing: -0.02em; }
	.article-body p { margin-top: 20px; color: var(--field-muted); line-height: 1.8; }
	.article-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-block: 32px; }
	.article-gallery img { display: block; width: 100%; height: auto; background: var(--field-soft); }
	.related-section { padding-block: 64px 72px; background: var(--field-soft); }
	.related-intro { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 36px; }
	.related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
	@media (max-width: 1100px) { .reading-layout { gap: 48px; grid-template-columns: 180px minmax(0, 1fr); } }
	@media (max-width: 760px) {
		.article-page { padding-block: 24px 48px; }
		.article-header { text-align: left; }
		h1 { font-size: clamp(38px, 9vw, 54px); }
		.article-meta { justify-content: flex-start; margin-top: 20px; }
		.article-intro { font-size: 18px; margin-top: 20px; }
		.article-photo { margin-block: 32px 36px; }
		.article-photo img { height: auto; aspect-ratio: 1.25; }
		.reading-layout { grid-template-columns: 1fr; gap: 32px; }
		.article-contents { position: static; padding-bottom: 24px; border-bottom: 1px solid var(--field-rule); }
		h2 { font-size: 28px; }
		.article-body p { font-size: 17px; }
		.article-gallery { grid-template-columns: 1fr; }
		.article-body section { padding-bottom: 28px; }
		.article-body section + section { padding-top: 28px; }
		.related-section { padding-block: 40px 48px; }
		.related-grid { grid-template-columns: 1fr; gap: 36px; }
	}
</style>
