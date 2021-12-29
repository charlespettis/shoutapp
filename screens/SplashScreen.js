import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Logo from '../components/common/Logo';

const SplashScreen = () => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'black'}}>
                <Logo/>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;
