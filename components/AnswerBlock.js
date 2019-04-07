import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Left } from "native-base";

import { MatchBlock } from "../components/MatchBlock";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    height: 300,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexWrap: "wrap",
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  verbBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
    height: 80,
    padding: 10
  },
  verbBlock1: {
    backgroundColor: "darkturquoise",
  },
  verbBlock2: {
    backgroundColor: "tomato",
  },  
  verbBlock3: {
    backgroundColor: "darkslateblue",
  },    
  verbText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold"    
  }
});

export class AnswerBlock extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.getVerb();
  }

  getVerb() {   
    if (this.props.activeVerbs.length === 0) {
      return false;
    }

    const selectedItem = this.props.activeVerbs.splice(Math.floor(Math.random()*this.props.activeVerbs.length), 1)[0];

    this.props.updateActiveVerb(selectedItem)
  }

  hiddenItem() {
    const item          = this.props.activeVerb;
    const verbTense     = ["infinitive", "simplePast", "pastParticiple"];
    const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];
    const selectedItem  = [ selectedTense, item[selectedTense]];

    return selectedItem;
  }

  render() {
    const activeVerb = this.props.activeVerb;
    const activeVerbTense = this.hiddenItem()[0];

    return (
      <View style={ styles.container }>   
        {                    
          this.props.remainingVerbs === 0 ?
          
          <Text >The End</Text> :

          Object.keys(activeVerb).map( (key) => {
            const hiddenVerb = key === activeVerbTense;

            return (                                                      
              hiddenVerb ?
              ( 
                <MatchBlock
                  key={key}
                  target={ activeVerb[key] }
                  hitOrMiss={ (r) => this.props.hitOrMiss(r) }
                  updateResult={ (r) => this.props.updateResult(r) }
                />
              ) :
              ( 
                <View key={key} style={ [styles.verbBlock,  styles.verbBlock2] }>
                  <Text style={ styles.verbText }>{ activeVerb[key].toUpperCase() }</Text> 
                </View>
              )                                                                                        
            );
          })
        }
      </View>
    );
  }
}
