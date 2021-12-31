import React from 'react';
import {Text, View, TextInput, Pressable,Keyboard,TouchableOpacity, SectionList,Image,KeyboardAvoidingView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {search} from '../api/search';
import { env } from '../misc';
import Topic from '../components/topic';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';
const Search = ({navigation, route}) => {
    const inputRef = React.useRef();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [data, setData] = React.useState([]);
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);

    const dismiss = () => {
        setSearchQuery("");
        setData([]);
        Keyboard.dismiss();
        playerFunctions.raise();
    }

    React.useEffect(()=>{
        navigation.addListener('focus', () => {
            inputRef.current.focus();
            playerFunctions.lower();
        })
    },[])

    const handleChangeText = e => {
        setSearchQuery(e);
        search(e)
        .then(data => {
            const result = [];
            result.push({
                title: 'TOPICS',
                data: data["TOPICS"]
            },
            {
                title: 'USERS', 
                data: data["USERS"]
            })
            setData(result);
        })
    }
    const Item = ({data}) => {
        if(data.username){
            return(
                <TouchableOpacity onPress={()=>navigation.navigate('ViewUserProfile', {id: data.id})}>
                <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                    <Image source={{uri: `${data.avatar}`}} style={{height:70,width:70,borderRadius:100}}/>
                    <View style={{marginLeft:10}}>
                        <Text style={{marginBottom:5, color:'white',fontSize:16,fontWeight:'300'}}>
                            {data.fullName}                       
                        </Text>
                        <Text style={{color:'lightblue',fontSize:14,fontWeight:'200'}}>
                            @{data.username}                       
                        </Text>
                        
                    </View>
                </View>
                </TouchableOpacity>
            )
        } else {
            return(
                <Topic 
                    category={data.category}
                    timestamp={data.createdAt}
                    id={data.id}
                    imageUri={data.image}
                    title={data.title}
                    navigation={navigation}
                />
            )
        }
    }
    return(
        <KeyboardAvoidingView style={{flex:1,backgroundColor:'black'}}>
            <View style={{width:'100%',height:70,backgroundColor:'#191919',justifyContent:'flex-end',paddingBottom:10}}>
                <View style={{flexDirection:'row', alignItems:'center',alignSelf:'center'}}>   
                    <View style={{backgroundColor:'#2r42424',width:'80%',height:30, alignSelf:'center',borderRadius:4,alignItems:'center',flexDirection:'row'}}>
                        <Ionicons name='search' color='white' size={18} style={{paddingLeft:10,paddingRight:10}} />
                        <TextInput onBlur={()=>playerFunctions.raise()} onFocus={()=>playerFunctions.lower()} onSubmitEditing={()=>playerFunctions.raise()} value={searchQuery} onChangeText={e => handleChangeText(e)} placeholder='Search' placeholderTextColor='white' ref={inputRef} autoFocus style={{color:'white',width:'100%'}}/>
                    </View>
                    <TouchableOpacity onPress={dismiss}>
                        <Text style={{color: 'white',marginLeft:10}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SectionList
                sections={data}
                renderItem={({ item }) => <Item data={item}/>}
                renderSectionHeader={({ section: { title, data } }) => (
                    data.length > 0 && <Text style={{color:'white',margin:20}}>{title}</Text>
                  )}
            
            />
        </KeyboardAvoidingView>
    )
}

export default Search;