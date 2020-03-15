<script>
import Chart from './Chart.svelte';

export let data
console.log('data',data)

const getLastEvolution = (array) => {
  return Math.round((array[array.length-1]-array[array.length-2])/array[array.length-2]*10000)/100
}
</script>

<div id="{data.country}" class="pb-1 shadow-xl">
  <div class="max-w-screen-xl mx-auto my-24">
    <div class="max-w-screen-xl px-4 mx-auto my-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h2 class="mb-24 text-4xl font-bold leading-10 tracking-tight text-gray-800 font-display sm:text-5xl sm:leading-none md:text-52xl">
          Evolution in <span style="color:{data.color}">{data.country}</span>
        </h2>
        <!-- <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p> -->
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-1/2">
        <div class="pb-4 lg:px-8">
          <div class="flex items-center justify-between w-full mb-4">
            <a href="/#global_sick"><h3 class="text-xl font-bold">Active Sick Cases</h3></a>
            <div class="{getLastEvolution(data.sick) <= 0 ? 'text-cogreen' : 'text-cored'} {getLastEvolution(data.sick) > 20 && 'font-bold'}">
              {#if getLastEvolution(data.sick) > 0}+{/if}
              {getLastEvolution(data.sick)}%
            </div>
          </div>
          <Chart datas={[data]} type='sick' country={true} />
        </div>
      </div>
      <div class="w-full xl:w-1/2">
        <div class="pb-4 lg:px-8">
          <div class="flex items-center justify-between w-full mb-4">
            <a href="/#global_new"><h3 class="text-xl font-bold">New Cases</h3></a>
            <div class="{getLastEvolution(data.new) <= 0 ? 'text-cogreen' : 'text-cored'} {getLastEvolution(data.new) > 20 && 'font-bold'}">
              {#if getLastEvolution(data.new) > 0}+{/if}
              {getLastEvolution(data.new)}%
            </div>
          </div>
          <Chart datas={[data]} type='new' country={true} />
        </div>
      </div>
      <div class="w-full xl:w-1/2">
        <div class="pb-4 lg:px-8">
          <div class="flex items-center justify-between w-full mb-4">
            <a href="/#global_recovered"><h3 class="text-xl font-bold">Recovered Cases</h3></a>
            <div class="{getLastEvolution(data.recovered) > 0 ? 'text-cogreen' : 'text-cored'} {getLastEvolution(data.recovered) > 20 && 'font-bold'}">
              {#if getLastEvolution(data.recovered) > 0}+{/if}
              {getLastEvolution(data.recovered)}%
            </div>
          </div>
          <Chart datas={[data]} type='recovered' country={true} />
        </div>
      </div>
      <div class="w-full xl:w-1/2">
        <div class="pb-4 lg:px-8">
          <div class="flex items-center justify-between w-full mb-4">
            <a href="/#global_dead"><h3 class="text-xl font-bold">Death Cases</h3></a>
            <div class="{getLastEvolution(data.dead) <= 0 ? 'text-cogreen' : 'text-cored'} {getLastEvolution(data.dead) > 20 && 'font-bold'}">
              {#if getLastEvolution(data.dead) > 0}+{/if}
              {getLastEvolution(data.dead)}%
            </div>
          </div>
          <Chart datas={[data]} type='dead' country={true} />
        </div>
      </div>
      <div class="w-full xl:w-1/2">
        <div class="pb-4 lg:px-8">
          <div class="flex items-center justify-between w-full mb-4">
            <a href="/#global_confirmed"><h3 class="text-xl font-bold">Confirmed Cases</h3></a>
            <div class="{getLastEvolution(data.confirmed) <= 0 ? 'text-cogreen' : 'text-cored'} {getLastEvolution(data.confirmed) > 20 && 'font-bold'}">
              {#if getLastEvolution(data.confirmed) > 0}+{/if}
              {getLastEvolution(data.confirmed)}%
            </div>
          </div>
          <Chart datas={[data]} type='confirmed' country={true} />
        </div>
      </div>
    </div>
  </div>
</div>
