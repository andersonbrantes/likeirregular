import React, { Component } from "react";
import { View } from "react-native";
import { Text, Input, Button } from "native-base";

export class MatchBlock extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      sentText: ""
    };
  }

  verbMatched() {
    const sentText   = this.state.sentText.toUpperCase();
    const targetVerb = this.props.target.toUpperCase();
    const result     = sentText === targetVerb;

    this.props.hitOrMiss(result);

    return result;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
        <Input
          placeholder="Username"
          onChangeText={ (text) => this.setState({ sentText: text }) }
        />

        <Text>{ this.props.target }</Text>

        <Button
          onPress={() => this.verbMatched() }
          primary>
          <Text> Tap to Check </Text>
        </Button>
      </View>
    );
  }
}
