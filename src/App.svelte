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
	getNew,
	getNewDeaths,
	getCountry,
	getDataTrend
} from './helpers/datas.js'

import Tailwindcss from './Tailwindcss.svelte'
import Menu from './components/Menu.svelte'
import ChartConfirmed from './components/ChartConfirmed.svelte'
import ChartDead from './components/ChartDead.svelte'
import ChartRecovered from './components/ChartRecovered.svelte'
import ChartSick from './components/ChartSick.svelte'
import ChartNew from './components/ChartNew.svelte'
import ChartCountry from './components/ChartCountry.svelte'
import ChartTrend from './components/ChartTrend.svelte'
import Footer from './components/Footer.svelte'

let datas = []
let datatrend = []
let countriesEnrichi = []
//let getCountries = null
console.log("00000")

onMount(async () => {
	let tab = await fetchDatas('brutes.csv')
	let tab_enrichi = await fetchDatas('mains_enrichis.csv')
	
	let countries = getCountries(tab)
	countriesEnrichi = getCountries(tab_enrichi)
	console.log("111111",countriesEnrichi)
	let colors = getArrayColor(countries.length, colorPalet, 1)
	let colorsBg = getArrayColor(countries.length, colorPalet, 0.5)

  datas = countries.map((country,i)=>{
		let countr = country.toLowerCase().includes('iran') ? 'Iran' : country.toLowerCase().includes('korea') ? 'Korea' : country;
		let tabcountry = getCountry(tab,country);
		console.log("datescountry",country,getDates(tabcountry));
    return {
			dates: getDates(tabcountry),
			country: countr,
			color: colors[i],
			colorBg: colorsBg[i],
			sick: getSick(tabcountry),
			confirmed: getConfirmed(tabcountry),
			dead: getDeaths(tabcountry),
			recovered: getRecovered(tabcountry),
			new: getNew(tabcountry),
			newDeaths: getNewDeaths(tabcountry)
    }
  })
	
  console.log('datas general',datas)
})

/*
<ChartSick {datas} />
	<ChartNew {datas} />	
	<ChartDead {datas} />*/

</script>

<Tailwindcss />

<main>
	<Menu />
	
	<ChartDead {datas} />
	<ChartTrend {datatrend} {countriesEnrichi} />
	
	{#if datas.length > 0}
		{#each datas as data, i}
			<ChartCountry {data} />
		{/each}
	{/if}
	<Footer />
</main>
