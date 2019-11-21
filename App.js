/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';

import {View, SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {format} from 'date-fns';

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
    case 'showers':
      return 'weather-rainy';

    case 'loading':
      return 'loading';

    default:
      return 'emoticon-sad-outline';
  }
};

const styledText = baseStyle => ({style, ...props}) => {
  const mergedStyle = {
    ...baseStyle,
    ...style,
  };

  return <Text style={mergedStyle} {...props} />;
};

const WeatherIcon = ({current}) => {
  return <Icon style={styles.weatherIcon} name={toIconName(current)} />;
};

const Temperature = ({value}) => {
  const text = value ? `${value}°` : '-';

  return <PrimaryText>{text}</PrimaryText>;
};

const toWeatherText = kind => {
  switch (kind) {
    case 'sunny':
      return 'SUNNY';

    case 'showers':
      return 'SHOWERS';

    default:
      return '-';
  }
};

const Weather = ({temperature, kind = 'unknown'}) => {
  return (
    <View style={styles.weather}>
      <WeatherIcon current={kind} />
      <Temperature value={temperature} />
      <SecondaryText>{toWeatherText(kind)}</SecondaryText>
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

const Card = ({location}) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    setTimeout(() => setWeather({temperature: 13, kind: 'showers'}), 1000);
  }, [location]);

  return (
    <View style={styles.card}>
      <Header />
      <Weather {...weather} />
      <Footer city={location.city} country={location.country} />
    </View>
  );
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Card
            location={{
              city: 'London',
              country: 'UK',
              lattitude: '51.507222',
              longitude: ' -0.1275',
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const colors = {
  dark: '#32353d',
  yellow: '#e1c866',
  primary: '#6d5c23',
  contrast: '#fffceb',
};

const theme = {
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.contrast,
  },
};

const bar = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
};

const styles = StyleSheet.create({
  ...theme,
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  card: {
    backgroundColor: colors.yellow,
    minHeight: 450,
    minWidth: 300,
    borderRadius: 10,
    flexDirection: 'column',
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
    paddingTop: 20,
  },
  primaryText: {
    ...theme.primary,
    fontSize: 42,
  },
  secondaryText: {
    ...theme.secondary,
    fontSize: 26,
    fontWeight: '500',
  },
  weather: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    flexGrow: 1,
    fontSize: 72,
  },
  weatherIcon: {
    fontSize: 144,
    color: colors.contrast,
  },
});

const PrimaryText = styledText(styles.primaryText);
const SecondaryText = styledText(styles.secondaryText);

export default App;
