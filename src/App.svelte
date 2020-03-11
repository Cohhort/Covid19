<script>
import Tailwindcss from './Tailwindcss.svelte';
import Menu from './components/Menu.svelte';
// import Title from './components/Title.svelte';
// import Chart from './components/Chart.svelte';
import ChartConfirmed from './components/ChartConfirmed.svelte';
import ChartDead from './components/ChartDead.svelte';
import ChartRecovered from './components/ChartRecovered.svelte';
import ChartSick from './components/ChartSick.svelte';
import ChartNew from './components/ChartNew.svelte';
import Footer from './components/Footer.svelte';
</script>

<Tailwindcss />

<main>
	<Menu />
	<ChartConfirmed />
	<ChartDead />
	<ChartRecovered />
	<ChartSick />
	<ChartNew />
	<!-- <Title title="Covid19" /> -->
	<!-- <Chart graph="sicks"/> -->
	<Footer />
</main>
