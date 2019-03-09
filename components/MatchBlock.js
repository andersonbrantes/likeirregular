import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "native-base";

export class MatchBlock extends Component {
  constructor(props){
    super(props);
  
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
          placeholder={ this.props.target }
          onChangeText={ (text) => this.setState({ sentText: text }) }
          style={styles.guessVerb}
        />

        <Button
          onPress={() => this.verbMatched() }
          primary>
          <Text> Tap to Check </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  guessVerb: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#999",
    margin: 10,
    padding: 10,
    fontSize: 25,
    textTransform: "uppercase"    
  }
});
