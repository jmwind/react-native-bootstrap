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

var ShopifyInternalApp = React.createClass({
  render: function() {
   return (
     <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title: 'Movies',
         component: MoviesListView,
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
