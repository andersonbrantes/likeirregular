import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from 'native-base';

export class HitVerbs extends Component {

  render() {
    return (
      <View>
        <Text style={{ color: 'green' }}>{ this.props.hit }</Text>
      </View>
    )
  }
}
