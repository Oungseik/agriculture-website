<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { excerpt, type BlogPost } from '#lib/blog.js';

	let { post }: { post: BlogPost } = $props();
</script>

<article>
	<a class="story-link" href={resolve('/blog/[slug]', { slug: post.slug })}>
		<div class="story-photo"><img src={asset(post.image)} alt={post.alt} width={post.image === 'images/landscape.webp' ? 1672 : 1024} height={post.image === 'images/landscape.webp' ? 941 : 1024} loading="lazy" /></div>
		<h3>{post.title}</h3>
		<p class="story-meta">{post.category} <span aria-hidden="true">·</span> <time datetime={post.date}>{post.dateLabel}</time></p>
		<p class="story-excerpt">{excerpt}</p>
		<span class="story-action">Read story <ArrowRight size={18} aria-hidden="true" /></span>
	</a>
</article>

<style>
	article { min-width: 0; }
	.story-link { display: block; color: var(--field-ink); text-decoration: none; }
	.story-photo { overflow: hidden; background: var(--field-soft); }
	img { width: 100%; aspect-ratio: 1.5; object-fit: cover; transition: transform 240ms ease-out; }
	h3 { margin-top: 24px; font-family: var(--font-heading); font-size: 26px; font-weight: 400; line-height: 1.3; letter-spacing: -0.02em; }
	.story-meta { display: flex; flex-wrap: wrap; gap: 4px 8px; margin-top: 12px; color: var(--field-muted); font-size: 14px; }
	.story-excerpt { margin-top: 16px; color: var(--field-muted); font-size: 17px; line-height: 1.7; }
	.story-action { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; margin-top: 16px; font-size: 16px; text-decoration: underline; text-underline-offset: 0.25em; }
	.story-link:hover img { transform: scale(1.035); }
	.story-link:hover .story-action { text-decoration-thickness: 2px; }
	@media (max-width: 760px) { h3 { margin-top: 18px; font-size: 24px; } }
	@media (prefers-reduced-motion: reduce) { img { transition: none; } .story-link:hover img { transform: none; } }
</style>
