/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var {
  AppRegistry,
  Image,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} = React;

var HealthCheckListView = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      text: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentWillMount: function() {
    var ref = new Firebase("https://gsdapp.firebaseio.com/sessions");
    this.bindAsArray(ref, "sessions");
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.sessions),
      text: ''
    });
  },

  _handleSubmit: function() {
    this.firebaseRefs.sessions.push({
      text: this.state.text
    });
    this.setState({ text: '' });
  },

  renderSession: function(session) {
    return (
      <TouchableHighlight onPress={() => {this.props.navigator.push({title: movie.title, component: HealthCheckEditView, passProps: {movie: movie}})}}>
        <Text style={styles.text}>{session.text} - {session}</Text>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView style={styles.listView}
          dataSource={this.state.dataSource.cloneWithRows(this.state.sessions)}
          renderRow={this.renderSession}
          renderSeparator={(rowData) => <View style={styles.separator}/>}
        />
        <TextInput
           style={styles.textinput}
           multiline= {true}
           value={this.state.text}
           onChangeText={(text) => {
            this.setState({text});
          }}
         />
        <TouchableHighlight underlayColor='white' onPress={() => this._handleSubmit()}>
          <View style={styles.completed}>
            <Text style={styles.completed_text}>{"SUBMIT"}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: '#dddddd'
  },
  completed: {
    flex: 2,
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#47D1AA',
    opacity: 1,
    borderRadius: 25
  },
  completed_text: {
    color: 'white',
    textAlign: 'center'
  },
  textinput: {
    flex: 1,
    padding: 5,
    marginTop: 5,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    flex: 1
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = HealthCheckListView;
