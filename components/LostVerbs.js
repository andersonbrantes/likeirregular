import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from "native-base";

const styles = StyleSheet.create({
  missIcon: {
    width: 50,
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center" 
  },  
  missScore: {
    color: "white",
    fontSize: 25,
    marginTop: 5
  },
  missText: {
    color: "#ffffff",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  missBlock: {   
    marginTop: 5,
    padding: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"  
  }
});

export class LostVerbs extends Component {

  render() {
    return (
      <View style={ styles.missBlock }>
        <Text style={ styles.missText }>miss</Text>
        <View style={ styles.missIcon } >
          <Icon name="close" style={ { color: "red" } }/>
        </View>        
        <Text style={ styles.missScore }>{ this.props.lost }00</Text>
      </View> 
    );
  }
}
