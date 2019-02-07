import React, { Component } from 'react';
import {View ,StyleSheet,FlatList,Text,Alert,ActivityIndicator,Image,Dimensions,TouchableHighlight} from 'react-native';

 var data= '',height,width;

class ListFinalApi extends Component {

    constructor(props)
    {
      super(props);
      height = Dimensions.get('window').height;
     width = Dimensions.get('window').width;
      this.getListCall= this.getListCall.bind(this);
      this.state = {
      isLoading: true,
      data: [],

          }
    }

    componentDidMount(){
       this.getListCall();
    }

    getListCall(){
       var that = this;
       var url = "http://appsjunction.orafox.com/apis/get_app_categories";

       this.formdata = new FormData();
        this.formdata.append("bundle_id", "com.orafox.hearttouchinglovepoems.android");
        this.formdata.append("os_type", "Android");
        this.formdata.append("device_id", "12346");
    console.log('@@ getMostPopularApi->>>>>>> ' +url + ' - >>>>>>>>>>>' +JSON.stringify(this.formdata));


       fetch(url,{
         method: 'POST',
        //  headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        //  },
         body: this.formdata,

       }).then((response) => response.json())
        .then((responseText) => {

        this.setState({isLoading: false, data : responseText.categeory});

       console.log("inside responsejson>>>>>>>>>>"+ responseText.categeory);
       console.log(">>>>>>>>>>"+ this.state.data);

         }).done();
    }


    FlatListItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }


     onCategoryClick(index,rowData){
         Alert.alert(rowData.name);
       }

    //for Itemlayout and its data set
    renderItem = ({ item: rowData, index }) => {

       var imageSrc = require('../img/profile.png');
          if(rowData.photo_path != ''){
            imageSrc = {uri : rowData.photo_path};
          }

       return (
         <TouchableHighlight style={{backgroundColor:'#e0e0e0'}} underlayColor='transparent' onPress={() => { this.onCategoryClick(index,rowData); }}>
          <View style={{flex:1,flexDirection:'row', padding: 5 }}>
                    <Image borderRadius={10} style={{width:width/2 - 15,height:width/3}} resizeMode='cover' source={imageSrc} />

              <View style={{flex:1,flexDirection:'column',backgroundColor: 'transparent', justifyContent: 'center'}}>
                  <Text style={styles.item}>{rowData.name}</Text>
                  <Text style={styles.item}>{rowData.created_on}</Text>

              </View>
          </View>

           </TouchableHighlight>
            );
           }


  render() {

    if (this.state.isLoading) {
    return (
     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
      return (
        <View style={styles.container}>

        <FlatList
           data={this.state.data}
           ItemSeparatorComponent = {this.FlatListItemSeparator}
           renderItem={this.renderItem}
           keyExtractor={(item, index) => index.toString()}
          />

        </View>

      );

    }
}
export default ListFinalApi


const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 15
  },
  imageView: {

    width:  '50%',
    height: 50 ,
    margin: 7,
    borderRadius : 7

},

  item: {
    padding: 4,
    color:'#4074c9',
    fontSize: 15

  },
})
