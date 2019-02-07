import React, { Component } from 'react';
import {View ,StyleSheet,FlatList,Text,Alert} from 'react-native';


class List extends Component {

  // getListItem(){
  //   alert(item);
  // }

  render() {
      return (
        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
              {key: 'Joel'},
              {key: 'John'},
              {key: 'Jillian'},
              {key: 'Jimmy'},
              {key: 'Julie'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} 
          />

        </View>

      );

    }
}
export default List


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
