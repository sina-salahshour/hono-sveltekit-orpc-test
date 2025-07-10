<script lang="ts">
	import { api } from '$lib';
	async function orpctest() {
		const planet = api.planet.find({ id: 69 });
		// const res = await api.planet.create({
		// 	name: 'UrAnus',
		// 	description: 'this is the best planet ever existed'
		// });

		// const list = await api.planet.list({});

		// console.log(list);
	}

	$effect(() => {
		orpctest();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
