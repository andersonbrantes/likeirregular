import React, { Component } from "react";
import { View } from "react-native";
import { Text, Input } from "native-base";

import { MatchBlock } from "../components/MatchBlock";

export class AnswerBlock extends Component {
  constructor (props) {
    super(props);
  }

  hiddenItem() {
    const item          = this.props.activeVerb;
    const verbTense     = ["infinitive", "simplePast", "pastParticiple"];
    const selectedTense = verbTense.splice(Math.floor(Math.random()*verbTense.length), 1)[0];
    const selectedItem  = [ selectedTense, item[selectedTense]];

    return selectedItem;
  }

  render() {
    const activeVerb = this.props.activeVerb
    const activeVerbTense = this.hiddenItem()[0];

    return (
      <View>
        {
          <Text>{ this.hiddenItem() }</Text>
        }                

        {
          Object.keys(activeVerb).map( (key) => {
            const hiddenVerb = key === activeVerbTense

            return (                            
              <View key={key}>
              {
                hiddenVerb ?
                ( 
                  <MatchBlock
                    target={ activeVerb[key] }
                    hitOrMiss={ (r) => this.props.hitOrMiss(r) }
                  />
                ) :
                ( <Text>{ activeVerb[key] }</Text> )
              }                                                                
              </View>
            )
          })
        }
      </View>
    );
  }
}
