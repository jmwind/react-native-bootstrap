/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var MoviesListView = require('./MoviesListView');
var HealthChecksListView = require('./HealthChecksListView');

var ShopifyInternalApp = React.createClass({
  render: function() {
   return (
     <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Health Checks',
         component: HealthChecksListView,
         rightButtonTitle: 'Add',
       }}
     />
   );
 }
});

var styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'white',
 },
});

AppRegistry.registerComponent('ShopifyInternalApp', () => ShopifyInternalApp);
