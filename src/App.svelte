<script>
import { onMount } from "svelte";
import { 
	colorPalet,
	getArrayColor,
	fetchDatas,
	getCountries,
	getDates,
	getConfirmed,
	getDeaths,
	getRecovered,
	getSick,
	getNew
} from './helpers/datas.js'

import Tailwindcss from './Tailwindcss.svelte';
import Menu from './components/Menu.svelte';
import ChartConfirmed from './components/ChartConfirmed.svelte';
import ChartDead from './components/ChartDead.svelte';
import ChartRecovered from './components/ChartRecovered.svelte';
import ChartSick from './components/ChartSick.svelte';
import ChartNew from './components/ChartNew.svelte';
import Footer from './components/Footer.svelte';

let tab = []
let dates = []
let countries = []
let datas = []
let colors = []
let colorsBg = []

onMount(async () => {
  tab = await fetchDatas('brutes.csv')
  dates = getDates(tab)
  countries = getCountries(tab)
  datas = countries.map((country,i)=>{
    return {
      country: country,
			sick: getSick(tab.filter(row=>row[0]==country)),
			confirmed: getConfirmed(tab.filter(row=>row[0]==country)),
			dead: getDeaths(tab.filter(row=>row[0]==country)),
			recorvered: getRecovered(tab.filter(row=>row[0]==country)),
			new: getNew(tab.filter(row=>row[0]==country))
    }
  })
  
  colors = getArrayColor(countries.length, colorPalet, 1)
	colorsBg = getArrayColor(countries.length, colorPalet, 0.5)
	
  console.log('datas',datas)
})
</script>

<Tailwindcss />

<main>
	<Menu />
	<ChartSick />
	<ChartConfirmed />
	<ChartDead />
	<ChartRecovered />
	<ChartNew />
	<!-- <Title title="Covid19" /> -->
	<!-- <Chart graph="sicks"/> -->
	<Footer />
</main>
