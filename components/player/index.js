import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import ProgressBar from './ProgressBar';

const Player = props => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [sound, setSound] = React.useState();
    const [progress, setProgress] = React.useState(0);
    const [position, setPosition] = React.useState();

    const toggleRecording = async () => {
        if(!isPlaying){
            playRecording();
            setIsPlaying(true);
        } else {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    }

    const playRecording = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true
        })
        const {sound} = await Audio.Sound.createAsync(
            {uri: props.recording}
        );
        setSound(sound);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(async (status) => {
            setProgress((status.positionMillis / status.durationMillis) * 100);
            setPosition(status.positionMillis);
            if(status.didJustFinish){
                setIsPlaying(false);
                await sound.unloadAsync();
                setProgress(0);
            }
        })
    }

    const forwardTenSeconds = () => {
        sound.setPositionAsync(position + 10000)
    }

    const rewindTenSeconds = () => {
        sound.setPositionAsync(position - 10000)
    }

    React.useEffect(()=>{
        return async () => {
            sound && sound.unloadAsync();
        }
    },[sound])

    return(
        <View style={{flexDirection:'column', alignItems:'center',width:'100%',justifyContent:'flex-start',flex:1}}>
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between',width:'100%'}}>

                {
                    props.leftIcon
                }

                <TouchableOpacity onPress={rewindTenSeconds}>
                    <MaterialCommunityIcons name='rewind-10' color='white' size={22} />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleRecording}>
                    <Ionicons name={isPlaying ? 'pause' : 'play'} color='white' size={32} />
                </TouchableOpacity>

                <TouchableOpacity onPress={forwardTenSeconds}>
                    <MaterialCommunityIcons name='fast-forward-10' color='white' size={22} />
                </TouchableOpacity>
                
                {
                    props.rightIcon
                }

            </View>
            <ProgressBar
            progress={sound && progress}
            />

        </View>
    )
}

export default Player;