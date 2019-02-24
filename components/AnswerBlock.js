import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { verbs } from './data/VerbsData';

const activeVerbs = verbs;

export class AnswerBlock extends Component {
    constructor (props) {
        super(props);
    }

    _getVerb() {
        const selectedItem = activeVerbs.splice(Math.floor(Math.random()*activeVerbs.length), 1)[0];

        return selectedItem
    }

    render() {
        const item = this._getVerb();

        return (
            <View>
                { 
                    <Text>{item.infinitive} / {item.simplePast} / {item.pastParticiple}</Text>
                }

{/*                 {
                    this.state.activeVerbs.map( (v, i) => {
                        return <View key={i}>
                            <Text>{v.infinitive} / {v.simplePast} / {v.pastParticiple}</Text>
                        </View>
                    })
                } */}
            </View>
        )
    }
}