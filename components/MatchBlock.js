import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { Text, Input, Button } from "native-base";

const styles = StyleSheet.create({
  matchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#2B3E49"
  },
  guessVerb: {
    margin: 10,
    padding: 10,
    textAlign: "center",
    height: 80,
    color: "#f2f2f2",
    fontSize: 30,
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
    textDecorationStyle: 'solid',
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

  matchedVerb() {
    const sentText   = this.state.sentText.toUpperCase();
    const targetVerb = this.props.target.toUpperCase();
    const result     = sentText === targetVerb;

    this.props.updateResult(result);

    return result;
  }

  render() {
    return (
      <View style={ styles.matchContainer } >

        <TextInput
          ref={(input) => { this.nameInput = input; }} 
          // placeholder={ /* this.props.target */ }
          onChangeText={ (text) => this.setState({ sentText: text }) }
          style={styles.guessVerb}
          underlineColorAndroid="transparent"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="characters"
        />

        <Button
          onPress={() => this.matchedVerb() }
          primary
          style={ styles.checkBtn }
        >
          <Text> Check </Text>
        </Button>
      </View>
    );
  }
}
