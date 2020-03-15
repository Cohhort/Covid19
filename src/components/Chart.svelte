<script>
import { onMount } from "svelte";
import Chart from "chart.js";

export let datas
export let type
export let country = false
let selector = ''

console.log('datas Chart.svelte',datas, type)

selector = !country ? 'chart_'+type : String('chart_'+type+'_'+datas[0].country.substring(0, 12).toLowerCase())
console.log('selector Chart.svelte',selector)

function is_touch_device() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}

onMount(async () => {
  // selector = !country ? 'chart_' : String('chart_'+type+'_'+datas[0].country.substring(0, 2).toLowerCase())
  // console.log('selector Chart.svelte',selector)
  const touchable = is_touch_device()
  var ctx = document.getElementById(selector)
  var chart = await new Chart(ctx, {
    type: "line",
    data: {
      labels: datas[0].dates,
      datasets: datas.map((data,i)=>{
        let config = {
          label: data.country,
          borderWidth: 2,
          borderColor: data.color,
          pointRadius: touchable ? 0 : 1,
          pointBorderWidth: touchable ? 0 : 1,
          backgroundColor: data.colorBg,
          data: data[type]
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
  })
})
</script>

<canvas class="cursor-pointer" id="{selector}"></canvas>