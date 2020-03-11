<script>
import { onMount } from "svelte";
import Chart from "chart.js";
import { colorPalet, getArrayColor, fetchDatas, getCountries, getDates, getDeaths } from './../helpers/datas.js'

export let graph

let tab = []
let dates = []
let datesInversed = []
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
      datas: getDeaths(tab.filter(row=>row[0]==country))
    }
  })
  
  colors = getArrayColor(countries.length, colorPalet, 1)
  colorsBg = getArrayColor(countries.length, colorPalet, 0.5)
  
  var ctx = document.getElementById("chartDead").getContext("2d");
  var chart = await new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: datas.map((data,i)=>{
        let config = {
          label: data.country,
          borderWidth: 2,
          borderColor: colors[i],
          pointRadius: 2,
          pointBorderWidth: 2,
          backgroundColor: colorsBg[i],
          data: data.datas
        }
        i === 0 ? config.fill = 'origin' : ''
        return config
      })
    },
    options: {
      elements: {
        line: {
          fill: '-1'
        }
      },
      scales: {
        yAxes: [{
          stacked: true,
        }]
      },
      legend: {
        display: false,
        position: 'bottom',
        fontFamily: 'Montserrat'
      },
      tooltips: {
        enabled: true,
        mode: 'point',
        position: 'nearest',
        titleFontFamily: 'Montserrat',
        titleFontSize: 12,
        titleAlign: 'center',
        bodyFontFamily: 'Montserrat',
        xPadding: 12,
        yPadding: 12,
        // custom: customTooltips
      }
    }
  });
});

const getLastEvolution = (array) => {
  return Math.round((array[array.length-1]-array[array.length-2])/array[array.length-2]*10000)/100
}
</script>

<div class="pb-1 shadow-xl">
  <div class="max-w-screen-xl mx-auto my-24">
    <div class="max-w-screen-xl px-4 mx-auto my-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h2 class="mb-24 text-4xl font-bold leading-10 tracking-tight text-gray-800 font-display sm:text-5xl sm:leading-none md:text-52xl">
          Evolution of <span class="text-coorange">Death Cases</span> over the world
        </h2>
        <!-- <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p> -->
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full mx-8 xl:w-5/6">
        <canvas class="cursor-pointer" id="chartDead"></canvas>
      </div>
      <div class="w-full xl:w-1/6">
        <div class="px-8 pt-6 xl:pr-8 xl:pl-0 xl:pt-0">
          <div class="mb-2 text-sm font-bold">Last Update ({dates[dates.length-1]})</div>
          <div class="flex flex-wrap xl:flex-col">
            {#each datas as item,i}
              <div class="flex items-center mb-2 mr-3 xl:mr-0 xl:mb-1">
                <div class="w-6 h-4 mr-2" style="background-color:{colors[i]}"></div>
                <div class="text-xs {getLastEvolution(item.datas) > 20 && 'font-bold'}">{item.country}: {item.datas[item.datas.length-1]}
                (<span class="{getLastEvolution(item.datas) <= 0 ? 'text-cogreen' : 'text-cored'}">
                  {#if getLastEvolution(item.datas) > 0}+{/if}
                  {getLastEvolution(item.datas)}%
                </span>)
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>