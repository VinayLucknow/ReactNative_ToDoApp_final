import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { Appbar,TextInput, Button,Card, List } from 'react-native-paper';

export default class App extends React.Component {

  arr=[]
  id=0

  state = {
    text: '',
    item:[
       
      {id:1, data:"loading"}

    ]
  };

  storedata = async() =>{

    // initial part

    // this.arr.push(this.state.text)

    // await AsyncStorage.setItem('mylist', JSON.stringify(this.arr))
    // //value = await AsyncStorage.getItem('mylist') // This line result String 
    // value = JSON.parse(await AsyncStorage.getItem('mylist')) // This line returns Array after parse String.
    // console.log(value)
    // console.log(typeof value)

  // Some improvement
  // Storing object in arr.

    this.arr.push({id:this.id, data:this.state.text})
    this.id++

    // Setting arr to loacl storage after convert in String.
    await AsyncStorage.setItem('mylist', JSON.stringify(this.arr))
    //value = await AsyncStorage.getItem('mylist') // This line result String 

    this.setState({
      item:JSON.parse(await AsyncStorage.getItem('mylist')) // This line returns Array after parse String.
    })

    console.log(this.state)
  }

  // ComponentDidMount is used for display data list initialy(very first time when app load) if list is not blank.
  async componentDidMount(){
    this.setState({
      item:JSON.parse(await AsyncStorage.getItem('mylist')) || "" // This line returns Array after parse String.
    })

    this.arr = JSON.parse(await AsyncStorage.getItem('mylist')) || [] // This line returns Array after parse String.
    this.id = this.arr[this.arr.length-1].id + 1
  }

  render(){

    if(this.state.item.length > 0){
      // traversing items one by one from item array.
      //map is an operator which is used for traverse
      // item one by one from list.

      renderList = this.state.item.map(item=>{

           //return <Text key ={item.id}>{item.data}</Text>

           // Now I am using Card and List.Item of react-native-paper for make UI intractive.
           // List.Item will be used at the place of Text.

           return <Card key = {item.id} style = {{margin:5}}>
                  
                  <List.Item
                    title={item.data}
                    //description="Item description"

                    // This line is used for show folder icon at left. 
                    //left={props => <List.Icon {...props} icon="folder" />
                    right={() => <List.Icon icon="delete" />}
                  />

                 </Card>

      })
    }else{
      renderList=<Text>No item found</Text>
    }

    return (
      <View style={styles.container}>
  
     {/* This Appbar is used from react-native-paper.
     for used react-native-paper components, 
     we need to install react-native-paper dependencies by using following commands.
     sudo npm install react-native-paper */}

         <Appbar.Header>
          <Appbar.Content
            title="To Do List"
          />
        </Appbar.Header>

        <TextInput
        label='Add todo items'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      <Button mode="contained" onPress={this.storedata} style = {{margin:10}}>
        Add Item
      </Button>
        
          <ScrollView>
          {renderList}
          </ScrollView>
      
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0d1'
  },
});
