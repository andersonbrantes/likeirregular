import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export class MainProgress extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visibleModal: null,
      fill: 85 // %
    };
  }
  
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row', marginTop: 80, marginBottom: 50 }}>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={this.state.fill}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        >
          {
            (fill) => (
              <Text>
                { this.state.fill }
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </View>            
    )
  }
}
