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
    fontSize: 25,
    marginTop: 7
  },
  hitText: {   
    color: "#ffffff",
    marginBottom: 10, 
  },
  hitBlock: {
    marginTop: 132,
    width: 100,
    height: 112,    
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
