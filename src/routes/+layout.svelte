<script lang="ts">
	import { asset } from '$app/paths';
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/webp" href={asset('images/sun-mark.webp')} />
</svelte:head>

{@render children()}
