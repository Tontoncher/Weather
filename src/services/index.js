export class Api {

  async getWeatherByName(city_name, key='330216f9e3042b8a57a7865c3de67865') {
    if (city_name) {
      let request = new Request(`http://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${key}`)
      try {
        let response = await fetch(request)
        let data = await response.json()
        // console.log('getReferences', data)
        return data
      }
      catch (e) {
        return
      }
    }
  }

  async getDailyWeatherByName(city_name, key='330216f9e3042b8a57a7865c3de67865') {
    let request = new Request(`http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&&appid=${key}`)

    try {
      let response = await fetch(request)
      let data = await response.json()
      return data
    }
    catch (e) {
      return
    }
  }

}
