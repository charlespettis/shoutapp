import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {env} from '../../misc';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Audio} from 'expo-av';
import ProgressBar from '../player/ProgressBar';

export const GlobalPlayerContext = React.createContext();

const GlobalPlayerProvider = props => {
    const initialState = {
        id: '',
        avatar: '',
        fullName: '',
        userName: '',
        recording: '',
        isShown: false,
        isRaised: false,
        isPlaying:false
    };

    const [state, dispatch] = React.useReducer(
        (prevState, action)=>{
            switch(action.type){
                case "PLAY":
                    return {
                        ...prevState,
                        ...action.data,
                        isShown: true,
                        isPlaying:true
                    }
                case "PAUSE":
                    return {
                        ...prevState,
                        isPlaying:false
                    }
                case "STOP":
                    return initialState
                case "RAISEPLAYER":
                    return {
                        ...prevState,
                        isRaised: true
                    }
                case "LOWERPLAYER":
                    return {
                        ...prevState,
                        isRaised: false
                    }
                case "RESUME":
                    return{
                        ...prevState,
                        isPlaying:true
                    }
            }
        },
        initialState
    );
    
    const playerFunctions = React.useMemo(
        ()=>({
            play: data => {
                play(data.recording);
                dispatch({type: "PLAY", data: data})
            },
            stop: () => {
                dispatch({type:"STOP"})
            },
            raise: () => {
                dispatch({type: "RAISEPLAYER" })
            },
            lower: () => {
                dispatch({type:"LOWERPLAYER"})
            }
        })
    )
    
    const [sound, setSound] = React.useState();

    const height = Dimensions.get('window').height;

    const play = async recording => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true
        })
        const {sound} = await Audio.Sound.createAsync(
            {uri: `${env}${recording}`}
        );
        setSound(sound);
        await sound.playAsync();

        setIsPlaying(true);
    }

    const pause = async () => {
        await sound.pauseAsync();
        dispatch({type:"PAUSE"})
    }

    const resume = async () => {
        await sound.playAsync();
        dispatch({type:"RESUME"})
    }

    React.useEffect(()=>{
        return async () => {
            sound && sound.unloadAsync();
        }
    },[sound])
    

    return(
            <GlobalPlayerContext.Provider value={{player: state, playerFunctions: playerFunctions}}>
                {
                    props.children
                }
                {
                state.isShown && 
                <View style={[{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:10,paddingRight:15,position:'absolute',width:'90%',alignSelf:'center',height:60,top:(state.isRaised ? .82 : .88) * height,backgroundColor:'#2A2A2C', borderRadius:3}, styles.shadow]}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View >
                        <Image source={{uri: `${env}${state.avatar}`}} style={{width:42,height:42}}/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{color:'white'}}>
                                {state.fullName}
                            </Text>
                            <Text style={{color:'white',fontWeight:'200'}}>
                                @{state.username}
                            </Text>
                        </View>
                    </View>
                    <Ionicons name={state.isPlaying ? 'pause' : 'play'} size={26} color='white' onPress={state.isPlaying ? pause : resume}/>
                </View>

                }
            </GlobalPlayerContext.Provider>            
    )
}
const styles = StyleSheet.create({
    shadow: {
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5, 
    }
})
export default GlobalPlayerProvider;