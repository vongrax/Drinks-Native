import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function Header(props) {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title?props.title: 'Drinks'}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        borderBottom: '1px solid red',
        textAlign: 'center',
        fontSize: '30px',
        backgroundColor: 'cadetblue',
        marginBottom:15
    },
    title: {
        fontSize: '30px',
    },
})