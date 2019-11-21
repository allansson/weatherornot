/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import Swiper from 'react-native-swiper';

import {Card} from './Card';
import {theme, colors} from './theme';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.background}>
        <Swiper>
          <View style={styles.container}>
            <Card
              color={colors.blue}
              location={{
                city: 'London',
                country: 'UK',
                lattitude: '51.5073',
                longitude: '-0.1277',
              }}
            />
          </View>
          <View style={styles.container}>
            <Card
              color={colors.yellow}
              location={{
                city: 'Kashmir',
                country: 'IND',
                lattitude: '34.0747',
                longitude: '74.8204',
              }}
            />
          </View>
        </Swiper>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  ...theme,
  background: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
