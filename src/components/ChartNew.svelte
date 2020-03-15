<script>
import { onMount } from "svelte";

import Chart from './Chart.svelte';

export let datas
let type = 'new'

const getLastEvolution = (array) => {
  return Math.round((array[array.length-1]-array[array.length-2])/array[array.length-2]*10000)/100
}
</script>

<div id="global_new" class="pb-1 shadow-xl">
  <div class="max-w-screen-xl mx-auto my-24">
    <div class="max-w-screen-xl px-4 mx-auto my-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h2 class="mb-24 text-4xl font-bold leading-10 tracking-tight text-gray-800 font-display sm:text-5xl sm:leading-none md:text-52xl">
          Evolution of <span class="text-coorange">New Cases</span> over the world
        </h2>
        <!-- <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p> -->
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-4/5">
        <div class="lg:px-8">
          {#if datas.length > 0}
            <Chart {datas} {type} />
          {/if}
        </div>
      </div>
      <div class="w-full xl:w-1/5">
        <div class="px-8 pt-6 xl:pr-8 xl:pl-0 xl:pt-0">
          {#if datas.length > 0}
            <div class="flex justify-between w-full text-xs">
              <div class="mb-2 text-xs font-bold">Last Update ({datas[0].dates[datas[0].dates.length-1]})</div>
              <div class="hidden mb-2 text-xs font-bold text-right xl:block">24h Evolution</div>
            </div>
            <div class="flex flex-wrap xl:flex-col">
              {#each datas as item,i}
                <a href="{'/#'+item.country}" class="flex items-center mb-2 mr-3 xl:mr-0 xl:mb-1">
                  <div class="w-6 h-4 mr-2" style="background-color:{item.color}"></div>
                  <div class="text-xs w-full flex justify-between {getLastEvolution(item[type]) > 20 && 'font-bold'}">
                    <div>{item.country}: {item[type][item[type].length-1]}</div>
                    <div class="{getLastEvolution(item[type]) <= 0 ? 'text-cogreen' : 'text-cored'}">
                      {#if getLastEvolution(item[type]) > 0}+{/if}
                      {getLastEvolution(item[type])}%
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>