<script lang="ts">
	import { asset } from '$app/paths';

	let { label, color }: { label: string; color: string } = $props();
</script>

<div
	class="bottle"
	role="img"
	aria-label={`Illustrative Moshi Moshi ${label} bottle; not actual packaging`}
>
	<img src={asset('images/bottle.webp')} alt="" width="238" height="640" />
	<div class="label" style:background-color={color} aria-hidden="true">
		<img src={asset('images/sun-mark.webp')} alt="" width="268" height="268" />
		<span class="brand-name">Moshi Moshi</span>
		<span class="category">{label}</span>
	</div>
</div>

<style>
	.bottle {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.bottle > img {
		width: 100%;
		height: 100%;
	}
	.label {
		position: absolute;
		inset: 34% 10% 11%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 7%;
		color: white;
		border-radius: 2px 2px 8px 8px;
		text-align: center;
		padding: 6% 3%;
	}
	.label img {
		width: 38%;
		height: auto;
		filter: brightness(0) invert(1);
	}
	.brand-name {
		font-size: clamp(8px, 0.75vw, 12px);
		font-weight: 700;
		line-height: 1.2;
	}
	.category {
		font-size: clamp(7px, 0.65vw, 10px);
		line-height: 1.2;
	}
</style>
