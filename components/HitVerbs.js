import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from "native-base";

const styles = StyleSheet.create({
  hitIcon: {
    width: 50,
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center" 
  },
  hitScore: {
    color: "white",
    fontSize: 40
  },
  hitText: {   
    color: "#ffffff"
  },
  hitBlock: {
    padding: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"    
  }
});

export class HitVerbs extends Component {

  render() {
    return (
      <View style={ styles.hitBlock }>
        <Text style={ styles.hitText }>hits</Text>
        <View style={ styles.hitIcon } >
          <Icon name="star" style={ { color: "yellow" } }/>
        </View>        
        <Text style={ styles.hitScore }>{ this.props.hit }</Text>
      </View>
    );
  }
}
