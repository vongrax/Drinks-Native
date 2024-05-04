import React, {useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from "react-native";
import Header from "../components/Header";
import {StatusBar} from "expo-status-bar";
import axios from "axios";


export default function HomeScreen({navigation}) {

    const [drink, setDrinks] = useState([])

    const [text, onChangeText] = React.useState("");

    const [search, setSearch] = useState([])

    const getDrinks = async () => {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
        if (response) {
            setDrinks(response.data.drinks)
        }
    }

    const searchDrinks = async () => {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + text)
        if (response.data.drinks) {
            setSearch(response.data.drinks)
        } else {
            setSearch([])
        }
        console.log(response.data.drinks)
    }

    useEffect(() => {
        getDrinks()
    }, [])

    useEffect(() => {
        searchDrinks()
    }, [text])

    return drink.length > 0 ? (
            <SafeAreaView style={styles.container}>
                <Header/>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                {text!== '' && search.length > 0 ? (<View style={styles.list}>
                    {search.map(i => (
                        <TouchableOpacity key={i.idDrink} style={styles.card}
                                          onPress={() => navigation.navigate('FullInfo', i.idDrink)}>
                            <Image
                                style={styles.tinyLogo}
                                source={{uri: i.strDrinkThumb}}
                            />
                            <Text>{i.strDrink}</Text>
                        </TouchableOpacity>

                    ))}
                </View>) : null}

                <View style={styles.list}>
                    {drink.map(i => (
                        <TouchableOpacity key={i.idDrink} style={styles.card}
                                          onPress={() => navigation.navigate('FullInfo', i.idDrink)}>
                            <Image
                                style={styles.tinyLogo}
                                source={{uri: i.strDrinkThumb}}
                            />
                            <Text>{i.strDrink}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
                <StatusBar style="auto"/>
            </SafeAreaView>
        )
        :
        (
            <SafeAreaView style={styles.preloader}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    preloader: {
        flex: 1,
        justifyContent: "center"
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    card: {
        textAlign: 'center',
        width: '45%',
        border: '1px solid #ccc',
        paddingBottom: 15,
        marginBottom: 15
    },
    tinyLogo: {
        width: 80,
        height: 80,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});
