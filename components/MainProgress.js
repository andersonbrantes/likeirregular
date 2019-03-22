import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const styles = StyleSheet.create({
  mainProgressContainer: {   
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    marginBottom: 50
  }
});

export class MainProgress extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visibleModal: null,
      totalVerbs: this.props.remainingVerbs
    };
  }
  
  render() {
    return (
      <View style={ styles.mainProgressContainer }>
        <AnimatedCircularProgress
          size={150}
          width={10}
          fill={ (this.props.remainingVerbs / this.state.totalVerbs) * 100}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        >
          {
            (fill) => (
              <Text style={{ fontSize: 40, color: "#f2f2f2" }} >
                { this.props.remainingVerbs }
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </View>            
    );
  }
}
