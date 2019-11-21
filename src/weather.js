export const now = (lattitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&units=metric&appid=7d83d516757e0b0ed3ceec99bf3a458c`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .then(weather => ({
      temperature: weather.main.temp,
      kind: toState(weather.weather[0].icon),
    }));
};

const toState = icon => {
  switch (icon) {
    case '01d':
    case '01n':
      return 'clear sky';

    case '02d':
    case '02n':
      return 'few clouds';

    case '03d':
    case '03n':
      return 'scattered clouds';

    case '04d':
    case '04n':
      return 'broken clouds';

    case '09d':
    case '09n':
      return 'shower rain';

    case '10d':
    case '10n':
      return 'rain';

    case '11d':
    case '11n':
      return 'thunderstorm';

    case '13d':
    case '13n':
      return 'snow';

    case '50d':
    case '50n':
      return 'mist';

    default:
  }
};
