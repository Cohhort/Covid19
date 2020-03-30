<script>
import { onMount } from "svelte";

import Chart from './Chart.svelte';

export let datas


</script>

<div id="trend" class="pb-1 shadow-xl">
  <div class="max-w-screen-xl mx-auto my-24">
    <div class="max-w-screen-xl px-4 mx-auto my-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h2 class="mb-24 text-4xl font-bold leading-10 tracking-tight text-gray-800 font-display sm:text-5xl sm:leading-none md:text-52xl">
          Comparaison of <span class="text-coorange">Epidemic Dynamics</span>
        </h2>
        <!-- <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p> -->
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-4/5">
        <div class="lg:px-8">
          
        </div>
      </div>
      <div class="w-full xl:w-1/5">
        <div class="px-8 pt-6 xl:pr-8 xl:pl-0 xl:pt-0">
          
        </div>
      </div>
    </div>
  </div>
</div>