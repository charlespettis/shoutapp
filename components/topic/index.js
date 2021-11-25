import React from 'react';
import {View, Text, Image} from 'react-native';
import Snake from '../../assets/images/snake.jpg';

const Topic = props => {
    return(
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',padding:10}}>
            <View style={{flexDirection:'column',width:'75%'}}>
                <Text style={{color:'lightblue',marginBottom:5}}>Technology</Text>
                <Text style={{color:'white'}}>Python 4 was just released. And while the data science community celebrates, we can all take a step back and recognize that JS is still the better language despite their whining and bullshit.</Text>
            </View>
            <Image source={Snake} resizeMode='cover' style={{height:'100%',width:'25%'}}/>
        </View>
    )
}

export default Topic;