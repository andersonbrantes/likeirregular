import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from "native-base";

const styles = StyleSheet.create({
  missScore: {
    color: "red",
    fontSize: 40
  },
  missText: {
    color: '#ffffff'
  },
  missBlock: {
    padding: 5,
    marginLeft: 20
  }
});

export class LostVerbs extends Component {

  render() {
    return (
      <View style={ styles.missBlock }>
        <Text style={ styles.missText }>miss</Text>
        <Text style={ styles.missScore }>{ this.props.lost }</Text>
      </View> 
    );
  }
}
