import React, {useState, useEffect} from 'react';

import {View, StyleSheet} from 'react-native';
import {PrimaryText, SecondaryText} from './Text';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {format} from 'date-fns';

import {colors, theme} from './theme';
import * as Weather from './weather';

const CurrentTime = ({date}) => (
  <View>
    <SecondaryText style={styles.primary}>
      {format(date, 'HH:mm')}
    </SecondaryText>
  </View>
);

const CurrentDate = ({date}) => (
  <View>
    <SecondaryText>{format(date, 'd MMM').toUpperCase()}</SecondaryText>
  </View>
);

const Header = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const handle = setTimeout(() => setDate(new Date()), 1000);

    return () => clearTimeout(handle);
  }, [date]);

  return (
    <View style={styles.header}>
      <CurrentTime date={date} />
      <CurrentDate date={date} />
    </View>
  );
};

const toIconName = state => {
  switch (state) {
    case 'clear sky':
      return 'weather-sunny';

    case 'few clouds':
      return 'weather-partlycloudy';

    case 'scattered clouds':
    case 'broken clouds':
      return 'weather-cloudy';

    case 'shower rain':
    case 'rain':
      return 'weather-rainy';

    case 'thunderstorm':
      return 'weather-lightning';

    case 'snow':
      return 'weather-snowy';

    case 'mist':
      return 'weather-fog';

    case 'loading':
      return 'loading';

    default:
      return 'emoticon-sad-outline';
  }
};

const WeatherIcon = ({current}) => {
  return <Icon style={styles.weatherIcon} name={toIconName(current)} />;
};

const Temperature = ({value}) => {
  const text = value !== undefined ? `${value.toFixed(0)}°` : '-';

  return <PrimaryText>{text}</PrimaryText>;
};

const CurrentWeather = ({temperature, kind = 'unknown'}) => {
  return (
    <View style={styles.weather}>
      <WeatherIcon current={kind} />
      <Temperature value={temperature} />
      <SecondaryText style={theme.primary}>{kind.toUpperCase()}</SecondaryText>
    </View>
  );
};

const Footer = ({city = '-', country = '-'}) => {
  return (
    <View style={styles.footer}>
      <SecondaryText>{city.toUpperCase()}</SecondaryText>
      <SecondaryText>{country.toUpperCase()}</SecondaryText>
    </View>
  );
};

export const Card = ({location, color}) => {
  const [weather, setWeather] = useState({kind: 'loading'});

  const style = {
    ...styles.card,
    backgroundColor: color,
  };

  useEffect(() => {
    Weather.now(location.lattitude, location.longitude)
      .then(setWeather)
      .catch(err => {
        console.error('Error fetching weather data', err);

        setWeather({kind: 'error'});
      });
  }, [location]);

  return (
    <View style={style}>
      <Header />
      <CurrentWeather {...weather} />
      <Footer city={location.city} country={location.country} />
    </View>
  );
};

const padding = 20;

const bar = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: padding,
};

const styles = StyleSheet.create({
  card: {
    minHeight: 450,
    minWidth: 300,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  header: {
    ...bar,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    ...bar,
    borderTopColor: colors.contrast,
    borderTopWidth: 2,
  },
  weather: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: padding,
    flexGrow: 1,
    fontSize: 72,
  },
  weatherIcon: {
    fontSize: 144,
    color: colors.contrast,
  },
  loading: {
    transform: [{rotate: ''}],
  },
});
