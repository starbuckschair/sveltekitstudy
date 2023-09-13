<script lang="ts">
	// import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ tutorials } = data);

	// data.tutorials.forEach((item: any) => {
	// 	console.log('>>> ' + item.title);
	// });

	function defaultButtonState(tutorial: any) {
		if (tutorial.state == 0) {
			return true;
		} else {
			return false;
		}
	}

	function processButtonState(tutorial: any) {
		if (tutorial.state == 1) {
			return true;
		} else {
			return false;
		}
	}

	function successButtonState(tutorial: any) {
		if (tutorial.state == 2) {
			return true;
		} else {
			return false;
		}
	}

	async function editState(index: number) {
		let tutorial = tutorials[index];
		tutorial.state = tutorial.state > 1 ? 0 : tutorial.state + 1;
		tutorials[index] = tutorial;
	}

	// onMount(() => {
	// 	const button: any = document.querySelector('.button');

	// 	button.addEventListener('click', function () {
	// 		button.classList.remove('button--default');

	// 		button.classList.add('button--process');

	// 		setTimeout(function () {
	// 			button.classList.remove('button--process');

	// 			button.classList.add('button--success');
	// 		}, 2000);

	// 		setTimeout(function () {
	// 			button.classList.remove('button--success');

	// 			button.classList.add('button--default');
	// 		}, 4500);
	// 	});
	// });
</script>

<svelte:head />

<!-- +page.svelte -->

<section>
	<div class="wrapper">
		{#each tutorials as tutorial, index}
			<form
				method="POST"
				action="?/editUser"
				use:enhance={() => {
					return async () => {
						editState(index);
					};
				}}
			>
				<input hidden name="id" type="text" value={tutorial._id} />
				<input hidden name="title" type="text" value={tutorial.title} />
				<input hidden name="state" type="number" value={tutorial.state} />
				<button
					class="button +
					 {tutorial.state == 0 ? 'button--default' : ''} +
					  {tutorial.state == 1 ? 'button--process' : ''} +
					   {tutorial.state == 2 ? 'button--success' : ''} "
				>
					<div class="button__icon-wrapper">
						<div class="button__icon" />
					</div>
					<div class="button__text-wrapper" style="width: {tutorial.length}em">
						<div class="button__text button__text--default">{tutorial.title}</div>
						<div class="button__text button__text--process">{tutorial.title}</div>
						<div class="button__text button__text--success">{tutorial.title}</div>
					</div>
				</button>
			</form>
		{/each}
	</div>
</section>

<style>
</style>
