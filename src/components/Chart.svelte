<script>
  let tab = []
  // let chart
  let tooltip = false
  let lastDate = ''
  let countries = []
  let lastDatas = []
  let colors = []

  import { onMount, beforeUpdate } from "svelte";
  import Chart from "chart.js";
  import gradstop from 'gradstop'
  import rgba from 'color-rgba'

  const getColUniques = (tab,i) => {let t = {}; tab.map( row=> row[0] == "country" || !row[1] ? "" : t[row[i]]=1); return Object.keys(t)};
  const getCol = (tab,i) => tab.map( row => row[0] == "country" || !row[0] ? "" : row[i]);
  const getDates = (tab) => getColUniques(tab, 1);
  const getCountries = (tab) => getColUniques(tab, 0);
  const getConfirmed = (tab) => getCol(tab, 2);
  const getDeaths = (tab) => getCol(tab, 3);
  const getRecovered = (tab) => getCol(tab, 4);
  const getSick = (tab) => getCol(tab, 5);
  const getNew = (tab) => getCol(tab, 6);

  const getArrayColor = function(length, colors) {
    console.log('getArrayColor length', length)
    if(length <= 7) {
      console.log('getArrayColor colors', colors)
      return colors
    } else {
      let gradient = []
      const nbgrad = Math.ceil(length/5)
      for (let i = 1; i < colors.length; i++) {
        let newArray = gradstop({
          stops: nbgrad, 
          inputFormat: 'hex', 
          colorArray: [colors[i-1], colors[i]]
        })
        i != (colors.length - 1) ? newArray.pop() : null
        gradient = gradient.concat(newArray)
      }
      console.log('getArrayColor gradient', gradient)
      return gradient
    }
  }

  const colorsTemplate = new Array('#ff4f81', '#ff6c5f', '#ffc168', '#2dde98', '#1cc7d0', '#00aeff', '#8e43e7');
  console.log('colorsTemplate', colorsTemplate)

  var customTooltips = function(tooltip) {
    tooltip = true
    const tooltipEl = document.getElementById('chartjs-tooltip');

    // Tooltip Element
    // var tooltipEl = document.getElementById('chartjs-tooltip');
    console.log('tooltipEl',tooltip)
    tooltipEl.innerHTML = '<table></table>';

    // if (!tooltipEl) {
    //   tooltipEl = document.createElement('div');
    //   tooltipEl.id = 'chartjs-tooltip';
    //   tooltipEl.innerHTML = '<table></table>';
    //   this._chart.canvas.parentNode.appendChild(tooltipEl);
    // }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltip = false
      tooltipEl.style.opacity = 0;
      // var titleLines = tooltip.title || [];
      // // var bodyLines = tooltip.body.map(getBody);

      // var innerHtml = '<thead>';
      // innerHtml += '<tr><th class="font-body">' + getDates(tab).reverse()[0] + '</th></tr>';

      // innerHtml += '</thead><tbody></tbody>';
      // var tableRoot = tooltipEl.querySelector('table');
      // tableRoot.innerHTML = innerHtml;
      return
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    // Set Text
    if (tooltip.body) {
      var titleLines = tooltip.title || [];
      var bodyLines = tooltip.body.map(getBody);

      var innerHtml = '<thead>';

      titleLines.forEach(function(title) {
        innerHtml += '<tr><th class="font-body">' + title + '</th></tr>';
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach(function(body, i) {
        var colors = tooltip.labelColors[i];
        var style = 'background:' + colors.backgroundColor;
        style += '; border-color:' + colors.borderColor;
        style += '; border-width: 2px';
        style += '; width: 12px';
        var span = '<span class="w-4 mr-2" style="' + style + '"></span>';
        innerHtml += '<tr><td>' + span + body + '</td></tr>';
      });
      innerHtml += '</tbody>';

      var tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    // var positionY = this._chart.canvas.offsetTop;
    // var positionX = this._chart.canvas.offsetLeft;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    // tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    // tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
    tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
  };


  onMount(async () => {
    console.log('document',document)
    tab = await fetch("https://covid19.cohhort.com/data/brutes.csv").then(function(response) {
      return response.ok ? response.text() : console.log("raté");
    }).then(function(datas) {
      const array = datas.split("\n").map(row=>row.split(','))
      return array
    })
    tab = tab.filter(row=>row && row[0] && row[1]).map(row=>{row[1] = row[1].split("/").reverse().join('/'); return row;});
    console.log('tab',tab)
    console.log('tab2',tab)
    console.log('getCountries(tab)',getCountries(tab))

    // const tooltipEl = document.getElementById('chartjs-tooltip');

    // tooltipEl.innerHTML = '<table></table>';
    lastDate = getDates(tab).reverse()[0]
    console.log('lastDate',lastDate)
    countries = getCountries(tab)
    lastDatas = countries.map((country,i)=>{
      return {
        country: country,
        sicks: getSick(tab.filter(row=>row[0]==country))
      }
    })
    console.log('lastDatas',lastDatas)

    // var innerHtml = '<thead>';
    // innerHtml += '<tr><th class="font-body">' + lastDate + '</th></tr>';

    // innerHtml += '</thead><tbody></tbody>';
    // var tableRoot = tooltipEl.querySelector('table');
    // tableRoot.innerHTML = innerHtml;

    colors = getArrayColor(getCountries(tab).length, colorsTemplate)
    const colorsBg = colors.map(color => 'rgba(' + rgba(color)[0] + ', ' + rgba(color)[1] + ', ' + rgba(color)[2] + ', ' + 0.5 + ')')
    console.log('colors', colors)
    console.log('colorsBg', colorsBg)
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = await new Chart(ctx, {
      type: "line",
      data: {
        labels: getDates(tab),
        datasets: getCountries(tab).map((country,i)=>{
          let config = {
            label: country,
            borderWidth: 2,
            borderColor: colors[i],
            // hoverBackgroundColor: colors[i],
            // hoverBorderWidth: 3,
            pointRadius: 2,
            pointBorderWidth: 2,
            // pointBackgroundColor: 'transparent',
            // pointBorderColor: 'transparent',
            // pointStyle: 'line',
            // backgroundColor: colors[i],
            // pointBackgroundColor: colors[i],
            backgroundColor: colorsBg[i],
            data: getSick(tab.filter(row=>row[0]==country))
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
          // backgroundColor: 'rgba(255, 255, 255, 0.8)',
          titleFontFamily: 'Montserrat',
          titleFontSize: 14,
          titleAlign: 'center',
          bodyFontFamily: 'Montserrat',
          xPadding: 12,
          // custom: customTooltips
        }
      }
    });
  });
  // console.log('myLineChart.generateLegend()',chart)
</script>

<div class="max-w-screen-xl mx-auto my-24">
  <div class="my-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
    <div class="sm:text-center lg:text-left">
      <h2 class="font-display text-4xl tracking-tight leading-10 font-bold text-gray-800 sm:text-5xl sm:leading-none md:text-52xl">
        Real-time Graphics to better understand
        <br />
        <span class="text-cored">Covid19 dynamic</span>
      </h2>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
      </p>
    </div>
  </div>
  <div class="flex">
    <div class="mx-8 w-5/6">
      <canvas class="cursor-pointer" id="myChart"></canvas>
    </div>
    <div class="mr-8 w-1/6">
      <!-- <div id="chartjs-tooltip"></div> -->
      {#if !tooltip}
        <div>
          <div class="text-sm font-bold mb-2">Last Update ({lastDate})</div>
          <div class="flex flex-col">
            {#each lastDatas as item,i}
              <div class="flex items-center mb-1">
                <div class="w-6 h-4 mr-2" style="background-color:{colors[i]}"></div>
                <div class="text-xs">{item.country}: {item.sicks.reverse()[0]} 
                  ({Math.round((item.sicks[0]-item.sicks[1])/item.sicks[1]*1000)/100}%)
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>