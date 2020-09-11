import React, { Component } from 'react'
import * as services from '../../services'

import FirstScreen from '../firstScreen'
import SecondScreen from '../secondScreen'

export default class Screen extends Component {

  state = {
    text: '',
    townList: [
      {"coord":{"lon":120.99,"lat":14.64},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":28,"feels_like":34,"temp_min":28,"temp_max":28,"pressure":1007,"humidity":88},"visibility":10000,"wind":{"speed":1,"deg":0},"clouds":{"all":75},"dt":1599818212,"sys":{"type":1,"id":8160,"country":"PH","sunrise":1599774280,"sunset":1599818461},"timezone":28800,"id":1692193,"name":"123","cod":200},{"coord":{"lon":58.4,"lat":53.96},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":20,"feels_like":16,"temp_min":20,"temp_max":20,"pressure":1014,"humidity":37},"visibility":10000,"wind":{"speed":4,"deg":180},"clouds":{"all":74},"dt":1599814960,"sys":{"type":1,"id":8976,"country":"RU","sunrise":1599787974,"sunset":1599834803},"timezone":18000,"id":577881,"name":"Beloretsk","cod":200},{"coord":{"lon":5.33,"lat":60.39},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"base":"stations","main":{"temp":11,"feels_like":3,"temp_min":11,"temp_max":12,"pressure":1004,"humidity":87},"visibility":10000,"wind":{"speed":11.3,"deg":160},"rain":{"1h":1.21},"clouds":{"all":75},"dt":1599817962,"sys":{"type":1,"id":1612,"country":"NO","sunrise":1599800250,"sunset":1599847994},"timezone":7200,"id":3161733,"name":"Bergen","cod":200},{"coord":{"lon":-88.31,"lat":41.89},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":15,"feels_like":13,"temp_min":14,"temp_max":16,"pressure":1026,"humidity":93},"visibility":10000,"wind":{"speed":4.1,"deg":60},"clouds":{"all":90},"dt":1599819156,"sys":{"type":1,"id":3851,"country":"US","sunrise":1599823795,"sunset":1599869385},"timezone":-18000,"id":4893591,"name":"Geneva","cod":200},{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":14,"feels_like":12,"temp_min":13,"temp_max":16,"pressure":1017,"humidity":67},"visibility":10000,"wind":{"speed":2.6,"deg":230},"clouds":{"all":75},"dt":1599814860,"sys":{"type":1,"id":1414,"country":"GB","sunrise":1599802181,"sunset":1599848683},"timezone":3600,"id":2643743,"name":"London","cod":200},{"coord":{"lon":37.62,"lat":55.75},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":13,"feels_like":6,"temp_min":12,"temp_max":14,"pressure":1013,"humidity":66},"visibility":10000,"wind":{"speed":9,"deg":290},"clouds":{"all":75},"dt":1599814862,"sys":{"type":1,"id":9029,"country":"RU","sunrise":1599792850,"sunset":1599839898},"timezone":10800,"id":524901,"name":"Moscow","cod":200},{"coord":{"lon":2.35,"lat":48.85},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":22,"feels_like":23,"temp_min":21,"temp_max":23,"pressure":1017,"humidity":60},"visibility":10000,"wind":{"speed":1,"deg":0},"clouds":{"all":25},"dt":1599817726,"sys":{"type":1,"id":6550,"country":"FR","sunrise":1599801723,"sunset":1599847951},"timezone":7200,"id":2988507,"name":"Paris","cod":200},{"coord":{"lon":35.87,"lat":48.52},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":24,"feels_like":21,"temp_min":24,"temp_max":24,"pressure":1017,"humidity":50},"visibility":10000,"wind":{"speed":5,"deg":360},"clouds":{"all":9},"dt":1599814960,"sys":{"type":1,"id":8901,"country":"UA","sunrise":1599793687,"sunset":1599839902},"timezone":10800,"id":697889,"name":"Pavlohrad","cod":200},{"coord":{"lon":56.04,"lat":54.77},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"base":"stations","main":{"temp":15,"feels_like":13,"temp_min":15,"temp_max":15,"pressure":1012,"humidity":82},"visibility":10000,"wind":{"speed":4,"deg":180},"rain":{"1h":0.21},"clouds":{"all":75},"dt":1599818092,"sys":{"type":1,"id":9050,"country":"RU","sunrise":1599788489,"sunset":1599835420},"timezone":18000,"id":479561,"name":"Ufa","cod":200},{"coord":{"lon":-63.68,"lat":-22.04},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":20,"feels_like":19,"temp_min":20,"temp_max":20,"pressure":1003,"humidity":47,"sea_level":1003,"grnd_level":936},"visibility":10000,"wind":{"speed":1.21,"deg":289},"clouds":{"all":100},"dt":1599814960,"sys":{"country":"BO","sunrise":1599819285,"sunset":1599862075},"timezone":-14400,"id":3901178,"name":"Yacuiba","cod":200}
    ],
    activePanel: 1,
    activeTown: '',
    key: ''
  }

  onChangeTownList = (value) => {
    this.setState({townList: value})
    history.replaceState(value, null)
  }
  onChangeActiveTown = (value) => {
    this.setState({activeTown: value})
    console.log(this.state.key)
  }
  onChangeActivePanel = (value, name) => {
    this.setState({activePanel: value})
    if (name) {
      this.addTown(name)
    }
    if (value == 1) {
      // this.updateTownList()
    }
  }
  addTown = async (name) => {
    let Api = new services.Api()
    let data = await Api.getWeatherByName(name)
    if (data) {
      if (data.cod != '404' && data.cod != '400') {
        let newTown = JSON.parse(JSON.stringify(data))
        // newTown.main.feels_like = Math.round(newTown.main.feels_like)
        newTown.main.temp = Math.round(newTown.main.temp)
        newTown.main.temp_max = Math.round(newTown.main.temp_max)
        newTown.main.temp_min = Math.round(newTown.main.temp_min)
        let newTownList = [...this.state.townList]

        let finded = this.state.townList.find((item) => item.name == newTown.name)

        if (finded) {
          let index = newTownList.indexOf(finded)
          newTownList.splice(index, 1, newTown)
        }
        else {
          newTownList = [...newTownList, newTown]
        }

        newTownList = newTownList.sort(function(a, b) {
          if (a.name > b.name) {
            return 1
          }
          if (a.name < b.name) {
            return -1
          }
          return 0
        })

        this.onChangeTownList(newTownList)
        this.onChangeActiveTown(finded.name)
      }
    }
  }
  deleteTown = (name) => {
    let newTownList = [...this.state.townList]
    let finded = newTownList.find((item) => item.name == name)
    let id = newTownList.indexOf(finded)

    newTownList.splice(id, 1)
    this.onChangeTownList(newTownList)
    this.onChangeActivePanel(1)
  }
  updateTownList = () => {
    this.state.townList.map((item) => {
      this.addTown(item.name)
    })
  }

  componentDidMount() {
    if (history.state != null) {
      this.onChangeTownList(history.state)
    }
  }

  render() {
    let panel = <FirstScreen
                  townList={this.state.townList}
                  onChangeTownList={this.onChangeTownList}
                  onChangeActivePanel={this.onChangeActivePanel}
                  onChangeActiveTown={this.onChangeActiveTown}
                  addTown={this.addTown}
                  deleteTown={this.deleteTown}
                  activeTown={this.state.activeTown}
                />
    if (this.state.activePanel == 2) {
      panel = <SecondScreen
                town={this.state.townList.find((item) => item.name == this.state.activeTown)}
                onChangeActivePanel={this.onChangeActivePanel}
              />
    }

    return (
      <div className='screen'>
        <div className='sky-background'></div>

        { panel }

      </div>
    )
  }
}
