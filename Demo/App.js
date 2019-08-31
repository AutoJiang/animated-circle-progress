/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import Circle from './src/Circle'
import CircleProgress from './src/CircleProgress'
import AnimatedCircle from './src/AnimatedCircle'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style = {styles.item}>
              <Text>Circle</Text>
              <Circle progress = {0.3}></Circle>
            </View>
            <View style = {styles.item}>
              <Text>AnimatedCircle</Text>
              <AnimatedCircle progress = {0.9}
                  radius = {60}
                  strokeWidth = {12}
                  duration = {2500}
                  strokeColor= "#4D47DD">
              </AnimatedCircle>
            </View>
            <View style = {styles.item}>
              <Text>CircleProgress</Text>
              <CircleProgress progress = {0.8}
                  radius = {80}
                  strokeWidth = {20}
                  duration = {3000}
                  strokeColor= "#2D578D"
                  fontSize = {30}>
              ></CircleProgress>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
  }
});

export default App;
