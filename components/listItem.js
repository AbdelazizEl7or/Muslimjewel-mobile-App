import React from 'react';
import { ImageProps, StyleSheet, View } from 'react-native';
import { Avatar, Button, ListItem, Text } from '@ui-kitten/components';

const InstallButton = (props) => (
    <Button size='tiny'>
        {props.buttonText}
    </Button>
);

const ItemImage = (props) => (
    <Avatar
        {...props}
        style={[props.style, styles.itemImage]}
        source={props.image}
    />
);

export const CustomListItem = (props) => (
    <ListItem
        onPress={() => props.onPress(props.id)}
        title={() => <Text style={{ fontFamily: 'font2', marginEnd: 10, fontSize: 23 }}>{props.title}</Text>}
        description={props.description}
        accessoryLeft={() => <View></View>}
        accessoryRight={() => <ItemImage image={props.image}></ItemImage>}
    />
);

const styles = StyleSheet.create({
    itemImage: {
        tintColor: null,
    },
});