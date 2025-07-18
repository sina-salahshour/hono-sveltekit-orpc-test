<script lang="ts">
	import { api } from '$lib';
	async function orpctest() {
		const res = await api.planet.create({
			name: 'Mars',
			description: 'this is the best planet ever existed'
		});
		void res;

		const list = await api.planet.list({});

		console.log(list);
	}

	$effect(() => {
		orpctest();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
