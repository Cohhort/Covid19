<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import Menu from './components/Menu.svelte';
	import Title from './components/Title.svelte';
	import Chart from './components/Chart.svelte';
	import Footer from './components/Footer.svelte';
</script>

<Tailwindcss />

<main>
	<Menu />
	<!-- <Title title="Covid19" /> -->
	<Chart />
	<Footer />
</main>
