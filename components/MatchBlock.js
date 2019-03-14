import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
TextInput.defaultProps.selectionColor = 'white';

import { Text, Input, Button } from "native-base";

export class MatchBlock extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      sentText: ""
    };
  }

  componentDidMount(){
    this.nameInput.focus(); 
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
      <View style={ styles.matchContainer } >

        <TextInput
          ref={(input) => { this.nameInput = input; }} 
          placeholder={ this.props.target }
          onChangeText={ (text) => this.setState({ sentText: text }) }
          style={styles.guessVerb}
          selectionColor={'white'}
        />

        <Button
          onPress={() => this.verbMatched() }
          primary
          style={ styles.checkBtn }
        >
          <Text> Check </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  matchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "darkorange"
  },
  guessVerb: {
    margin: 10,
    padding: 10,
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    height: 80,
    color: "#f2f2f2",
    fontWeight: 'bold'
  },
  checkBtn: {
    position: "absolute",
    top: 25,
    right: 0,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25    
  }
});
