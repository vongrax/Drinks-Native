import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View, Alert} from "react-native";
import axios from "axios";
import Header from "../components/Header";


export default function FullInfo({route}) {

    const [fullInfo, setFullInfo] = useState({})

    const getFullInfo = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + route.params)
            setFullInfo(response.data.drinks[0])
        } catch (e) {
            console.log(e)
            Alert.alert("Alert Title",
                "My Alert Msg",)
        }
    }

    useEffect(() => {
        getFullInfo()

    }, [])

    let ingredients = []

    if (fullInfo) {
        for (let key in fullInfo) {
            if (key.includes('strIngredient') && fullInfo[key]) {
                ingredients.push(fullInfo[key])
            }
        }
    }


    return fullInfo ? (
            <SafeAreaView style={styles.container}>
                <Header title={fullInfo.strDrink}/>

                <Image
                    style={styles.drinkImage}
                    source={{uri: fullInfo.strDrinkThumb}}
                />
                <View>
                    <View>
                        <Text>Category: {fullInfo.strAlcoholic} - {fullInfo.strCategory}</Text>
                        <Text>Glass: {fullInfo.strGlass}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Ingredients</Text>
                    </View>

                    {ingredients.map((ingredient, index) => (
                        <View style={styles.ingredient} key={index}>
                            <Image
                                style={styles.ingredientImage}
                                source={{uri: 'https://www.thecocktaildb.com/images/ingredients/' + ingredient + '-Medium.png'}}
                            />
                            <Text>{ingredient}</Text>
                        </View>
                    ))}
                    <View>
                        <Text style={styles.title}>Instruction</Text>
                        <Text style={styles.instruction}>{fullInfo.strInstructions}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
        :
        (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    drinkImage: {
        width: '100%',
        height: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    ingredient: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 40,
        marginTop: 10,
        marginBottom: 5,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    instruction: {
        paddingBottom: 20,
    }
});