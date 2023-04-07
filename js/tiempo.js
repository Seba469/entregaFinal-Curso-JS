let temperaturaValor = document.querySelector('#temperaturaValor')
let temperaturaDescripcion= document.querySelector('#temperaturaDescripcion')
let ubicacion = document.querySelector('#ubicacion')
let icono = document.querySelector('#icono')
let velocidadViento = document.querySelector('#velocidadViento')


window.addEventListener('load', () =>{

    let latitud
    let longitud

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(posicion => {
            latitud = posicion.coords.latitude
            longitud = posicion.coords.longitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=f2b7f6f774ff7ef7daae91e2db59b3be&units=metric&lang=sp`
        
            //console.log(url)

            fetch(url)
             .then((response) => response.json())
             .then((data) => {
                let temperatura = Math.round(data.main.temp)
                temperaturaValor.innerText = `${temperatura} °C`

                let descripcion = data.weather[0].description
                temperaturaDescripcion.innerText = descripcion

                ubicacion.innerText = data.name

                velocidadViento.innerText = `${data.wind.speed} m/s`

                let iconCode = data.weather[0].icon
                let urlIcono = `https://openweathermap.org/img/wn/${iconCode}.png`

                icono.src = urlIcono

                console.log(urlIcono)
             })
             .catch((error) => {
                console.log(error)
             })
        })
    }
})

