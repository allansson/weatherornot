import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {theme} from './theme';

const styles = StyleSheet.create({
  primaryText: {
    ...theme.primary,
    fontSize: 42,
  },
  secondaryText: {
    ...theme.secondary,
    fontSize: 22,
    fontWeight: '500',
  },
});

const styledText = baseStyle => ({style, ...props}) => {
  const mergedStyle = {
    ...baseStyle,
    ...style,
  };

  return <Text style={mergedStyle} {...props} />;
};

export const PrimaryText = styledText(styles.primaryText);
export const SecondaryText = styledText(styles.secondaryText);
