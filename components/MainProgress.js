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
    marginTop: 130,
    marginBottom: 100
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
          tintColor="#405DCF"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        >
          {
            (fill) => (
              <View>
                <Text style={{ fontSize: 50, color: "#f2f2f2" }} >
                  { this.props.remainingVerbs }00
                </Text>
                <Text style={{ fontSize: 20, textAlign: "center", marginTop: -10, color: "#f2f2f2" }}>total</Text>
              </View>
            )
          }
        </AnimatedCircularProgress>
      </View>            
    );
  }
}
