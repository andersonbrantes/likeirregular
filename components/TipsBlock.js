import React, { Component } from "react";
import { Image } from "react-native";
import { Card, CardItem, Thumbnail, Left, Body, Right, Text, Button, Icon } from "native-base";

export class TipsBlock extends Component {

  render() {
    return (
      <Card style={{ marginTop: 50 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https://www.pexels.com/search/nature/&docid=ShwNVOdFBcmkxM&tbnid=8c_UAo3gH_220M:&vet=1&w=500&h=200&source=sh/x/im"}} />
            <Body>
              <Text>NativeBase</Text>
              <Text note>GeekyAnts</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https://www.pexels.com/search/nature/&docid=ShwNVOdFBcmkxM&tbnid=8c_UAo3gH_220M:&vet=1&w=500&h=200&source=sh/x/im"}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
