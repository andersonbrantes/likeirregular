import React, { Component } from "react";
import { View, ImageBackground, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Container, Header, Content, Title, Footer, FooterTab, Text, Button, Icon, Left, Body, Right } from "native-base";


import { TipsBlock } from "./components/TipsBlock";
import { MainProgress } from "./components/MainProgress";
import { AnswerBlock } from "./components/AnswerBlock";
import { HitVerbs } from "./components/HitVerbs";
import { LostVerbs } from "./components/LostVerbs";
import { Slider } from "./components/Slider";

import { verbs } from "./data/VerbsData";

import Modal from "react-native-modal";

const styles = StyleSheet.create({
  scoreContainer: {
    marginTop: -21,
    paddingBottom: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  nextBtnBlock: { 
    marginTop: -65,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row" 
  },
  tipsBlockContainer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: -21 
  },

  modalContent: {
    backgroundColor: "red"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  }
});

const randomBGs = [
  require('./assets/background-01.jpg'),
  require('./assets/background-02.jpg'),
  require('./assets/background-03.jpg'),
  require('./assets/background-04.jpg')
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeVerbs: verbs,
      activeVerb: "",
      isReady: false,
      lostVerbs: 0,
      hitVerbs: 0,
      isModalVisible: false,
      visibleModal: null,
      lastGuess: null,
      hiddenVerb: 'teste'
    };
  }

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  componentWillMount() {
    this.loadFonts();
  }
  
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  updateActiveVerb(verb) {
    this.setState({
      activeVerb: verb
    });    
  }

  updateVerbs(verbsArray) {
    this.setState({
      activeVerbs: verbsArray
    });
  }

  updateResult(result) {   
    this.setState({ 
      visibleModal: null,
      lastGuess: result
    });    
  }

  hitOrMiss() {
    if (this.state.lastGuess === true) {
      this.setState({ hitVerbs: this.state.hitVerbs + 1 });
    } else {
      this.setState({ lostVerbs: this.state.lostVerbs + 1 });
    }
  }

  showModal() { 
    this.setState({ visibleModal: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Header style={{ height: 37 }}>
        </Header>
        
        <Content>                    
          <ImageBackground source={randomBGs[Math.floor(Math.random()*randomBGs.length)]} style={{width: "100%", paddingTop: 20}}>
            
            <View style={ styles.scoreContainer } >                          
              <LostVerbs lost={ this.state.lostVerbs } />

              <MainProgress remainingVerbs={ this.state.activeVerbs.length } />

              <HitVerbs hit={ this.state.hitVerbs } />
            </View>
            
            <View style={ styles.nextBtnBlock }>
              <Button onPress={() => this.showModal() } rounded primary>
                <Text> NEXT ONE </Text>
              </Button>
            </View>
          </ImageBackground>          

          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={ styles.tipsBlockContainer }>

              <View style={{ 
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"column",
                paddingTop: 40                
               }}>

                <View>
                  { 
                    this.state.lastGuess ?
                    ( <Icon name="star" style={ { fontSize: 50, color: "yellow" } }/> ) :
                    ( <Icon name="close" style={ { fontSize: 50, color: "red" } }/> )
                  }
                </View>

                {
                  Object.keys(this.state.activeVerb).map( (key) => {

                    return (
                      <Text key={key} style={[{ fontSize: 30 }, { color: this.state.hiddenVerb ? 'red' : 'green' }]}>
                        { key } - { this.state.activeVerb[key] }
                      </Text>
                    )
                  })
                }

                {/* <Slider />                 */}
              </View>

              <Modal
                isVisible={this.state.visibleModal === true}
                backdropColor={"black"}
                backdropOpacity={0.85}
                animationIn={"zoomInUp"}
                animationOut={"zoomOutDown"}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={700}
                backdropTransitionOutTiming={900}
                onModalHide={ () => this.hitOrMiss() }
              >
                <View style={styles.modalContent}>
                  <AnswerBlock
                    activeVerbs={ this.state.activeVerbs }
                    activeVerb={ this.state.activeVerb }
                    updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                    updateVerbs={ (v) => this.updateVerbs(v)}
                    updateResult={ (r) => this.updateResult(r) }
                    remainingVerbs={ this.state.activeVerbs.length }
                  />          
                </View>
              </Modal>
              
              {/* <AnswerBlock
                activeVerbs={ this.state.activeVerbs }
                activeVerb={ this.state.activeVerb }
                updateActiveVerb={ (v) => this.updateActiveVerb(v) }
                updateVerbs={ (v) => this.updateVerbs(v)}
                hitOrMiss={ (r) => this.hitOrMiss(r) }
                remainingVerbs={ this.state.activeVerbs.length }
              /> */}

              {/* <TipsBlock /> */}
            </View>
          </KeyboardAvoidingView>
        </Content>    

        <Footer>
          <FooterTab>
            <Button full>
              <Text>LikeIrregular</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
