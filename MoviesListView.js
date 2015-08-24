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

var MovieView = require('./MovieView');

var MOCKED_MOVIES_DATA = [
  {title: 'Jackass', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: 'Terminator', year: '2005', posters: {thumbnail: 'http://resizing.flixster.com/GbDqFVUc_9VBNAnanZVQxlYD0ZM=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/12/11191276_ori.jpg'}},
  {title: 'Titanic', year: '1990', posters: {thumbnail: 'http://resizing.flixster.com/dhoozi-cgKXMRyHgDzBRHu9HThw=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/09/11190997_ori.jpg'}},
  {title: 'Fight Clud', year: '1987', posters: {thumbnail: 'http://resizing.flixster.com/c508lXCTGuK495BkM-hwOKkvbAY=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/11/11191141_ori.jpg'}},
  {title: 'English Patient', year: '2011', posters: {thumbnail: 'http://resizing.flixster.com/Yq3Z4UWxG52y4Ar2KezEYb5mCP8=/173x270/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/07/11190760_ori.jpg'}},
  {title: 'Halo', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: '21 Jump Street', year: '2005', posters: {thumbnail: 'http://resizing.flixster.com/GbDqFVUc_9VBNAnanZVQxlYD0ZM=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/12/11191276_ori.jpg'}},
  {title: 'Black Swan', year: '1990', posters: {thumbnail: 'http://resizing.flixster.com/dhoozi-cgKXMRyHgDzBRHu9HThw=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/09/11190997_ori.jpg'}},
  {title: 'Mission Impossible', year: '1987', posters: {thumbnail: 'http://resizing.flixster.com/c508lXCTGuK495BkM-hwOKkvbAY=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/11/11191141_ori.jpg'}},
  {title: 'Dumb and Dumber', year: '2011', posters: {thumbnail: 'http://resizing.flixster.com/Yq3Z4UWxG52y4Ar2KezEYb5mCP8=/173x270/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/07/11190760_ori.jpg'}},
];

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var MoviesListView = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    /*
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
      */
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(MOCKED_MOVIES_DATA),
        loaded: true,
      });
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <TouchableHighlight onPress={() => {this.props.navigator.push({title: movie.title, component: MovieView, passProps: {movie: movie}})}}>
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MoviesListView;
