import React, { Component } from 'react';
import {View ,StyleSheet,TouchableOpacity,TextInput,Text,Image,Alert,Keyboard} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
 let regMob = /^[0-9]/;


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
         ImageSource: null,
         loadingImage : false,
         fullname: '',
         email: '',
         phno:'',
         password :'',
         profilePic:'',
         spGender:''
       };

  }

     //() For Gallary
     selectPhotoTapped() {
          this.setState({ loadingImage: true });
 //          onError(error){
 //   this.setState({ ImageSource: require('../src/profile.png')});
 // }

       const options = {
         quality: 1.0,
         maxWidth: 500,
         maxHeight: 500,
         storageOptions: {
           skipBackup: true
         }
       };

       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled photo picker');
         }
         else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         }
         else if (response.customButton) {
           console.log('User tapped custom button: ', response.customButton);
         }
         else {
           let source = { uri: response.uri };

           // You can also display the image using data:
           // let source = { uri: 'data:image/jpeg;base64,' + response.data };

           this.setState({

             ImageSource: source,
             defaultVal: ''
           });
         }
       });
     }


   //() For ValidationForm
     validationFun(){

       const {profilePic,fullname,email,password,phno,spGender}=this.state;
       var pwdLength = password.length.toString() ;
       var phnoLength = phno.length.toString() ;
       var mGender= spGender.valueOf();
       // profilePic=source;

       // if(profilePic === ""){
       //   alert('Please Select  Profile Photo ');
       // }
       //  else
         if(fullname === ""){
         alert('Please fill fullname ');
         // this.setState({Error:  'Please fill fullname'});
       }else if(email === ""){
         alert('Please fill Email ');
         // this.setState({Error:  'Please fill Email'});
       }else if(reg.test(email) === false){
         alert('Invalid Email ');
         // return false;
       }else if(password === ""){
         alert('Please fill Password ');
       }else if(pwdLength < 6){
         alert('Please Enter atlest 6 digit password');
       }else if(phno === ""){
         alert('Please fill Contact Number ');
       }else if (regMob.test(phno) === false) {
         alert('Invalid Contact Number');
       }else if (phnoLength < 10 ) {
         alert('Please enter 10 digit ContactNumber');
       }
       else{
         alert('Thank you ');
       }
       Keyboard.dismiss();
      //  else if (password !== confirmPassword) {
      //     alert('Passwords don't match!!!!!)
      // }
     }

  render() {

    let data = [{
     value: 'Male',
   }, {
     value: 'Female',
   }];

    return (

      <View  style={styles.container}>

        <View style={styles.firstrow}>
        </View>

            <View style={styles.secondrow} >

            <TouchableOpacity  onPress={this.selectPhotoTapped.bind(this)} >
            <View>
             <Image style={styles.imageprofile} source={this.state.ImageSource}>
            </Image>
           </View>
            </TouchableOpacity >

                <TextInput style = {styles.input} onChangeText={fullname => this.setState({fullname})}
                   underlineColorAndroid = "transparent"
                   placeholder = "Full Name"
                   placeholderTextColor = "#9a73ef"
                    autoCapitalize = "none"></TextInput>


                <TextInput style = {styles.input} onChangeText={email => this.setState({email})}
                  underlineColorAndroid = "transparent"
                  placeholder = "Email"
                  placeholderTextColor = "#9a73ef"
                   autoCapitalize = "none"></TextInput>


                <TextInput style = {styles.input} onChangeText={password => this.setState({password})}
                   password={true}
                   underlineColorAndroid = "transparent"
                   placeholder = "Password"
                   placeholderTextColor = "#9a73ef"
                   secureTextEntry={true}
                   autoCapitalize = "none"> </TextInput>

                 <TextInput style = {styles.input} onChangeText={phno => this.setState({phno})}
                      underlineColorAndroid = "transparent"
                      placeholder = "Contact Number"
                      placeholderTextColor = "#9a73ef"
                      keyboardType = 'numeric'
                       autoCapitalize = "none"></TextInput>

                   <Dropdown label='Gender'
                        data={data}
                      >

                </Dropdown>





          <TouchableOpacity style = {styles.submitButton} onPress={this.validationFun.bind(this)}>
             <Text style = {styles.submitButtonText}>{'Submit'.toUpperCase()}</Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
};
export default Home

const styles = StyleSheet.create({
   container: {
     flex: 1,
    flexDirection: 'column'
   },
   input: {
      height: 40,
      backgroundColor: '#B3b8c1d1',
      borderColor: '#125ee5',
      marginTop:15,
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#125ee5',
      width:250,
      alignSelf: 'center',
      padding: 10,
      marginTop:25,
      height: 40,
      borderWidth: 1,
       borderColor: '#125ee5',
        borderRadius: 25

   },

   submitButtonText:{
     alignSelf: 'center',
      color: 'white'
   },
   firstrow: {
      height: 252,
      backgroundColor: '#125ee5'
    },

    secondrow: {
      flex: 1,
      height: 100,
      paddingLeft:80,
      paddingRight:80,
      backgroundColor: '#b8c1d1',
      flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'stretch'
    },
    imageprofile: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      backgroundColor:'transparent',
      marginTop:-68,
      backgroundColor: '#ccc',
      marginBottom:15, borderRadius: 150/2
    }

    // ImageContainer: {
    //   borderRadius: 10,
    //   width: 250,
    //   height: 250,
    //   borderColor: '#9B9B9B',
    //   borderWidth: 1 / PixelRatio.get(),
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#CDDC39',
    //
    // },


})
