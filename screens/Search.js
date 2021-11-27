import React from 'react';
import {Text, View, TextInput, Keyboard,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


const Search = ({navigation, route}) => {
    const inputRef = React.useRef();

    const dismiss = () => {
        Keyboard.dismiss();
    }

    React.useEffect(()=>{
        navigation.addListener('focus', () => {
            inputRef.current.focus();
        })
    },[])

    return(
        <View style={{flex:1,backgroundColor:'#1D201F'}}>
            <View style={{width:'100%',height:70,backgroundColor:'#303634',justifyContent:'flex-end',paddingBottom:10}}>
                <View style={{flexDirection:'row', alignItems:'center',alignSelf:'center'}}>   
                    <View style={{backgroundColor:'#434C49',width:'80%',height:30, alignSelf:'center',borderRadius:4,alignItems:'center',flexDirection:'row'}}>
                        <Ionicons name='search' color='white' size={18} style={{paddingLeft:10,paddingRight:10}} />
                        <TextInput ref={inputRef} autoFocus style={{color:'white',width:'100%'}}/>
                    </View>
                    <TouchableOpacity onPress={dismiss}>
                        <Text style={{color: 'white',marginLeft:10}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Search;