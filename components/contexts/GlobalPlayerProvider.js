import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet, Pressable,TouchableWithoutFeedback} from 'react-native';
import {env} from '../../misc';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import ProgressBar from '../player/ProgressBar';
import Post from '../post';
import { PostsContext } from './PostsProvider';

export const GlobalPlayerContext = React.createContext();

const GlobalPlayerProvider = props => {

    const {posts, postsFunctions} = React.useContext(PostsContext);


    const initialState = {
        id: '',
        avatar: '',
        fullName: '',
        userName: '',
        recording: '',
        isShown: false,
        isRaised: false,
        isPlaying:false,
        likes: [],
        queue: []
    };

    const [state, dispatch] = React.useReducer(
        (prevState, action)=>{
            switch(action.type){
                case "PLAY":
                    return {
                        ...prevState,
                        ...action.data,
                        isShown: true,
                        isPlaying:true,
                        queue: posts
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
    const [progress, setProgress] = React.useState(0);
    const [isExpanded, setIsExpanded] = React.useState(false);

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
        sound.setOnPlaybackStatusUpdate(async (status) => {
            setProgress((status.positionMillis / status.durationMillis) * 100);
            if(status.didJustFinish){
                await sound.pauseAsync();
                await sound.setPositionAsync(0);
                dispatch({type:"PAUSE"})
            }
        });
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
                <View pointerEvents='box-none' style={{position:'absolute', height:'100%', width:'100%',paddingBottom:isExpanded ? 0 : (state.isRaised ? .08 : .02) * height, justifyContent:'flex-end'}}>
                    <View style={[{ width:'90%',alignSelf:'center',backgroundColor:'#2A2A2C', borderRadius:5}, styles.shadow, isExpanded && {width:'100%',padding:5,}]}> 
                        <Pressable onPress={()=>setIsExpanded(true)}>
                            { 
                            isExpanded ?
                            <View style={{borderRadius:5}}> 
                            <Ionicons onPress={()=>setIsExpanded(false)} name='chevron-down' size={24} color='white' style={{marginLeft:10,marginTop:10}}/>
                            <TouchableWithoutFeedback onPress={()=>setIsExpanded(false)}>
                            <Post focused id={state.id} fullName={state.fullName} avatar={state.avatar} username={state.username} likes={state.likes}/>
                            </TouchableWithoutFeedback>
                            <View style={{flexDirection:'row',alignItems:'center', alignSelf:'center',justifyContent:'space-between',width: '100%',paddingLeft:10,paddingRight:10,marginBottom:10}}>
                                <Ionicons name='play-back' size={22} color='white' />
                                <MaterialCommunityIcons name='rewind-10' size={22} color='white' />

                                <Ionicons name={state.isPlaying ? 'pause' : 'play'} size={32} color='white' onPress={state.isPlaying ? pause : resume}/>
                                
                                <MaterialCommunityIcons name='fast-forward-10' size={22} color='white' />
                                <Ionicons name='play-forward' size={22} color='white' />

                            </View>
                            
                            </View>
                            :
                            <MinPlayer state={state} pause={pause} resume={resume} />
                            
                            }
                            <ProgressBar progress={progress}/>
                        </Pressable>
                    </View>
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


const MinPlayer = ({state, pause, resume}) => {
    return(
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',height:60,paddingLeft:10,paddingRight:10}}>
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

    )
}