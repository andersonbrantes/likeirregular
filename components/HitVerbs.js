import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from "native-base";

const styles = StyleSheet.create({
  hitScore: {
    color: "green",
    fontSize: 40
  },
  hitText: {
    color: '#ffffff'
  },
  hitBlock: {
    padding: 5,
    marginRight: 20
  }
});

export class HitVerbs extends Component {

  render() {
    return (
      <View style={ styles.hitBlock }>
        <Text style={ styles.hitText }>hits</Text>
        <Text style={ styles.hitScore }>{ this.props.hit }</Text>
      </View>
    );
  }
}
