import React, { Component } from 'react'
import * as services from '../../services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default class SecondScreen extends Component {

  state = {
    days: [
      {date: 'Mon, 21', temp:'35°C 28°C', icon: '10d'},
      {date: 'Mon, 22', temp:'35°C 28°C', icon: '10d'},
      {date: 'Mon, 23', temp:'35°C 28°C', icon: '10d'},
      {date: 'Mon, 24', temp:'35°C 28°C', icon: '10d'},
    ]
  }

  getDayArr = (dayWeek) => {
    let arrFullName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
    let arr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let index = arrFullName.indexOf(dayWeek)
    return [ arr[index+1], arr[index+2], arr[index+3], arr[index+4], arr[index+5] ]
  }

  getDailyWeather = async (name, day, dayWeek) => {
    let Api = new services.Api()
    let data = await Api.getDailyWeatherByName(name)
    if (data.cod == '200') {
      let interval = data.list

      function del() {
        let intFullDate = interval[0].dt_txt.split(' ')[0]
        let intDate = intFullDate.split('-')[2]
        if (intDate == day) {
          interval.splice(0, 1)
          del()
        }
      }
      del()

      let intervalArr = {}
      interval.map((item) => {
        let intFullDate = item.dt_txt.split(' ')[0]
        let intDate = intFullDate.split('-')[2]

        if (intervalArr[intDate]) {
          if (intervalArr[intDate].length > 0) {
            intervalArr[intDate] = [...intervalArr[intDate], item]
          }
          else {
            intervalArr[intDate] = [item]
          }
        }
        else {
          intervalArr[intDate] = [item]
        }
      })

      let newDaysArr = []
      let arrNameDay = this.getDayArr(dayWeek)
      let dayIndex = 0
      for (let i in intervalArr) {
        let max = -300
        let min = 300

        intervalArr[i].map((item) => {
          if (item.main.temp_max > max) {
            max = item.main.temp_max
          }
          if (item.main.temp_min < min) {
            min = item.main.temp_min
          }
        })

        let newDay = {date: `${arrNameDay[dayIndex]}, ${i}`, temp:`${max}°C ${min}°C`, icon: '10d'}
        newDaysArr = [...newDaysArr, newDay]
        dayIndex ++
      }
      
      this.setState({days: newDaysArr})
    }
  }

  // componentDidMount() {
  //   let day = this.state.day
  //   let dayWeek = this.state.dayWeek
  //   this.getDailyWeather(this.props.town.name, day, dayWeek)
  // }

  render() {
    let date
    let town
    let tabWeather
    let tabTemp
    let tabMinMaxTemp
    let tabHumidity
    let tabPressure
    let tabWind
    let tabSunrise
    let tabSunset
    let tabDaytime
    let days

    if (this.props.town) {

      let d = new Date()
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
      let nd = new Date(utc + (1000 * this.props.town.timezone))

      let dayWeek
      let month
      let ampm
      let hours
      if (nd.getDay() == 1) {
        dayWeek = 'Monday'
      }
      else if (nd.getDay() == 2) {
        dayWeek = 'Tuesday'
      }
      else if (nd.getDay() == 3) {
        dayWeek = 'Wednesday'
      }
      else if (nd.getDay() == 4) {
        dayWeek = 'Thursday'
      }
      else if (nd.getDay() == 5) {
        dayWeek = 'Friday'
      }
      else if (nd.getDay() == 6) {
        dayWeek = 'Saturday'
      }
      else if (nd.getDay() == 7) {
        dayWeek = 'Sunday'
      }
      let day = nd.getDate().toString()
      if (nd.getDay() == 0) {
        month = 'Jan'
      }

      else if (nd.getMonth() == 1) {
        month = 'Feb'
      }
      else if (nd.getMonth() == 2) {
        month = 'Mar'
      }
      else if (nd.getMonth() == 3) {
        month = 'Apr'
      }
      else if (nd.getMonth() == 4) {
        month = 'May'
      }
      else if (nd.getMonth() == 5) {
        month = 'Jun'
      }
      else if (nd.getMonth() == 6) {
        month = 'Jul'
      }
      else if (nd.getMonth() == 7) {
        month = 'Aug'
      }
      else if (nd.getMonth() == 8) {
        month = 'Sep'
      }
      else if (nd.getMonth() == 9) {
        month = 'Oct'
      }
      else if (nd.getMonth() == 10) {
        month = 'Nov'
      }
      else if (nd.getMonth() == 11) {
        month = 'Dec'
      }
      let year = nd.getFullYear().toString()
      if (nd.getHours() > 12) {
        ampm = 'PM'
        hours = nd.getHours() - 12
      }
      else {
        ampm = 'AM'
        hours = nd.getHours()
      }
      let minutes = nd.getMinutes()
      if (minutes.toString().length == 1) {
        minutes = '0' + minutes.toString()
      }

      let ddd = dayWeek +', '+ day +' '+ month +' '+ year +' | '+ hours +':'+ minutes + ampm

      date = <span>{ ddd }</span>

      town =  <button
                onClick={() => this.props.onChangeActivePanel(1)}
              >
                {this.props.town.name + ', ' + this.props.town.sys.country + ' '}
                <FontAwesomeIcon icon={ faMapMarkerAlt } />
              </button>


      tabWeather =  <div>
                      <div className={'icon i' + this.props.town.weather[0].icon}></div>
                      <div className='weather'>{this.props.town.weather[0].main}</div>
                    </div>
      tabTemp = <div>
                  <span>{this.props.town.main.temp}</span>
                  <span>°C</span>
                </div>
      tabMinMaxTemp = <div>
                        <div className='temp'>{this.props.town.main.temp_max}°C</div>
                        <div className='temp'>{this.props.town.main.temp_min}°C</div>
                      </div>
      tabHumidity = <div>
                      <div className='icon'></div>
                      <div className='number'>{this.props.town.main.humidity}%</div>
                      <div className='text'>Humidity</div>
                    </div>
      tabPressure =  <div>
                    <div className='icon'></div>
                    <div className='number'>{this.props.town.main.pressure / 1000}mBar</div>
                    <div className='text'>Pressure</div>
                  </div>
      tabWind =  <div>
                <div className='icon'></div>
                <div className='number'>{(Math.trunc(this.props.town.wind.speed * 360))/100}km/h</div>
                <div className='text'>Wind</div>
              </div>

      let sunrise = (this.props.town.sys.sunrise % 86400) + this.props.town.timezone
      let sunriseH = Math.trunc(sunrise / 3600)
      let sunriseM = Math.trunc((sunrise % 3600) / 60)
      let sunset = (this.props.town.sys.sunset % 86400) + this.props.town.timezone
      let sunsetH = Math.trunc(sunset / 3600) - 12
      let sunsetM = Math.trunc((sunset % 3600) / 60)
      if (sunriseM.toString().length == 1) {
        sunriseM = '0' + sunriseM.toString()
      }
      if (sunsetM.toString().length == 1) {
        sunsetM = '0' + sunsetM.toString()
      }

      tabSunrise = <div>
                  <div className='icon'></div>
                  <div className='number'>{sunriseH}:{sunriseM} AM</div>
                  <div className='text'>Sunrise</div>
                </div>
      tabSunset =  <div>
                  <div className='icon'></div>
                  <div className='number'>{sunsetH}:{sunsetM} PM</div>
                  <div className='text'>Sunset</div>
                </div>

      let daytime = this.props.town.sys.sunset - this.props.town.sys.sunrise
      let daytimeH = Math.trunc(daytime / 3600)
      let daytimeM = Math.trunc((daytime % 3600) / 60)
      if (daytimeM.toString().length == 1) {
        daytimeM = '0' + daytimeM.toString()
      }

      tabDaytime = <div>
                  <div className='icon'></div>
                  <div className='number'>{daytimeH}h {daytimeM} m</div>
                  <div className='text'>Daytime</div>
                </div>

      this.getDailyWeather(this.props.town.name, day, dayWeek)

      days = this.state.days.map((item) => {
        return (
          <div key={item.date} className='days-slider-item tab-icon-num-text'>
            <div>
              <div className='icon'></div>
              <div className='number'>{item.date}</div>
              <div className='text'>{item.temp}</div>
            </div>
          </div>
        )
      })
    }

    return (
      <div className='panel-2'>
        <div className='second'>
          <div className='date-and-location'>
            { date }
            { town }
          </div>
          <div className='tabs'>
            <div className='tab tab-weather'>{ tabWeather }</div>
            <div className='tab tab-temp'>{ tabTemp }</div>
            <div className='tab tab-min-max-temp'>{ tabMinMaxTemp }</div>
            <div className='tab tab-icon-num-text'>{ tabHumidity }</div>
            <div className='tab tab-icon-num-text'>{ tabPressure }</div>
            <div className='tab tab-icon-num-text'>{ tabWind }</div>
            <div className='tab tab-icon-num-text'>{ tabSunrise }</div>
            <div className='tab tab-icon-num-text'>{ tabSunset }</div>
            <div className='tab tab-icon-num-text'>{ tabDaytime }</div>
          </div>
          <div className='days-slider'>
            { days }
          </div>
        </div>
      </div>
    )
  }
}
