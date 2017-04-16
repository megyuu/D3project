'use strict';
import React, { Component } from 'react';
import CheckBox from 'react-native-check-box';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ListView,
  Button,
  TabBarIOS,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';

class Greeting extends Component {
  render() {
    return (
        <Text>Hello {this.props.name}!</Text>
    );
  }
}

class SecondTab extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

    this.state = {
      selectedTab: 'SecondTab',
      word:'',
      text: '',
      todo: [],
      count: 1,
      unCheckedCount: 0,
      dataSource: ds.cloneWithRows([]),
    };
  }

  renderUncheckedTodoCount() {
    var unCheckedCount = 0;
    this.state.todo.map((todo) => {
        if(!todo.isChecked) {
            unCheckedCount++;  
        }
    })
    return unCheckedCount;
  }
  addItem() {
    this.state.todo = this.state.todo.concat({id: this.state.count, value: this.state.text, isChecked: false});
    this.state.count = this.state.count + 1;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.todo),
    });
    this.props.onTodoUpdated(this.renderUncheckedTodoCount());
  }

  deleteItem(item) {
    var indexOfItem = this.state.todo.findIndex((todo) => todo.id === item.id);
    this.state.todo.splice(indexOfItem, 1);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.todo),
    });
    this.props.onTodoUpdated(this.renderUncheckedTodoCount());
  }

  onClick(data) {
    data.isChecked = !data.isChecked;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.todo),
    });
    this.props.onTodoUpdated(this.renderUncheckedTodoCount());

  }

  renderColor(data) {
    if (data.isChecked) {
      return 'gray';
    } else {
      return 'black';
    }
  }

  _onChangeText(text) {
   this.setState({ text: text });
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{backgroundColor: '#F38181'}}>
          <Text style={{padding: 20, fontSize: 30, color: '#904480'}}>TODO</Text>
        </View>

        <View style={{backgroundColor: '#FCE38A'}}>
          <TextInput
            style={{height: 50}}
            placeholder="テキスト入力"
            onChangeText={(word) => this.setState({word: word})}
          />
          <Text style={{padding: 10, fontSize: 20}}>
            {this.state.word}
          </Text>
        </View>

        <View style={{backgroundColor: '#D6F7AD'}}>
          <TextInput
            style={styles.textform}
            onChangeText={this._onChangeText.bind(this)}
          />
          <TouchableHighlight　onPress={this.addItem.bind(this)} >
            <Text style={styles.addButton}>
              追加する
            </Text>
          </TouchableHighlight>
        </View>

        <ScrollView style={{height: 20, backgroundColor: '#95E1D3'}}>
          <ListView
            enableEmptySections={true}
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) =>
                          <View style={{flexDirection: 'row'}}>
                            <CheckBox
                                  style={{padding: 5, width:300}}
                                  onClick={()=>this.onClick(rowData)}
                                  isChecked={rowData.isChecked}
                                  rightText={rowData.id +' : '+ rowData.value}
                                  rightTextStyle={{color: this.renderColor(rowData)}}
                                  />
                                  <TouchableHighlight onPress={this.deleteItem.bind(this, rowData)}>
                                    <Text style={styles.deleteButton}>×</Text>
                                  </TouchableHighlight>
                          </View>
                        }
           />
        </ScrollView>

        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textform: {
    margin: 10,
    padding: 5,
    height: 35,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'white',
    },
  addButton: {
    color: '#425E92',
    height: 30,
    width: 80,
    padding: 8,
    margin: 10,
    textAlign: 'center',
    borderColor: '#7DACE4',
    backgroundColor: '#7DACE4',
    borderWidth: 2,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    color: '#cd5c5c',
    height: 20,
    width: 40,
    padding: 0,
    margin: 8,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'flex-end',
  }
});

module.exports = SecondTab;
