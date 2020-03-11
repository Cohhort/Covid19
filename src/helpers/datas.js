import gradstop from 'gradstop'
import rgba from 'color-rgba'

export const getColUniques = (tab,i) => {let t = {}; tab.map( row=> row[0] == "country" || !row[1] ? "" : t[row[i]]=1); return Object.keys(t)}
export const getCol = (tab,i) => tab.map( row => row[0] == "country" || !row[0] ? "" : row[i])

export const getDates = (tab) => getColUniques(tab, 1)
export const getCountries = (tab) => getColUniques(tab, 0)

export const getConfirmed = (tab) => getCol(tab, 2)
export const getDeaths = (tab) => getCol(tab, 3)
export const getRecovered = (tab) => getCol(tab, 4)
export const getSick = (tab) => getCol(tab, 5)
export const getNew = (tab) => getCol(tab, 6)

export const colorPalet = new Array('#ff4f81', '#ff6c5f', '#ffc168', '#2dde98', '#1cc7d0', '#00aeff', '#8e43e7')

export const getArrayColor = function(length, colors, opacity) {
  if(length <= 7) {
    return colors.map(color => 'rgba(' + rgba(color)[0] + ', ' + rgba(color)[1] + ', ' + rgba(color)[2] + ', ' + opacity + ')')
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
    return gradient.map(color => 'rgba(' + rgba(color)[0] + ', ' + rgba(color)[1] + ', ' + rgba(color)[2] + ', ' + opacity + ')')
  }
}

export const fetchDatas = async (fileName) => {
  let results = await fetch('./data/'+fileName).then(function(response) {
    return response.ok ? response.text() : console.log("raté");
  }).then(function(datas) {
    const array = datas.split("\n").map(row=>row.split(','))
    return array
  })
  return results.filter(row=>row && row[0] && row[1]).map(row=>{row[1] = row[1].split("/").reverse().join('/'); return row;});
}
