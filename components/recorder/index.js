import React from 'react';
import {View, Text, Animated, TouchableOpacity, Dimensions} from 'react-native';
import { Audio } from 'expo-av';
import Visualizer from './Visualizer';
import Timer from './Timer';

const Recorder = () => {

    const borderRadiusAnim = React.useRef(new Animated.Value(50)).current;
    const size = React.useRef(new Animated.Value(47)).current;
    const containerHeight = React.useRef(new Animated.Value(75)).current

    const [isRecording, setIsRecording] = React.useState(false);
    const [recording, setRecording] = React.useState();
    const [barValues, setBarValues] = React.useState([]);
    const [soundEffect, setSoundEffect] = React.useState();
    const [durationMillis, setDurationMillis] = React.useState();

    const screenWidth = Dimensions.get('screen').width;
    const handleRecording = () => {
        if(!isRecording){
            setIsRecording(!isRecording);
            animateStart();
            startRecording();
        } else {
            setIsRecording(!isRecording);
            animateEnd();
            stopRecording();
        } 
    }

    const startRecording = async () => {

        playSoundEffect()
        .then(async () => {
            setTimeout(()=>{return},1500)
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        
            }); 
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            recording.setProgressUpdateInterval(40)
            recording.setOnRecordingStatusUpdate(e => {
                const rawMeterValue = e.metering;
                const oldMin = -60;
                const oldMax = 0;
                const newMin = 0;
                const newMax = 50;
                const newValue = ((rawMeterValue - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
                setBarValues(prevState => [ newValue, ...prevState] );
                setDurationMillis(e.durationMillis);
                console.log(barValues.length);
                if( barValues.length > (screenWidth / 4) ){
                    console.log('heehee');
                    setBarValues(prevState => {
                        const newData = prevState.slice(0,prevState.length - 1);
                        return newData
                    })
                }

            })
            setRecording(recording);

        })
    }

    const stopRecording = async () => {
        setRecording(undefined);
        setBarValues([])
        playSoundEffect();
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    const animateStart = () => {
        Animated.timing(borderRadiusAnim, {
            toValue: 3,
            duration:300
        }).start()
        Animated.timing(size, {
            toValue:25,
            duration:300
        }).start()
        Animated.timing(containerHeight, {
            toValue: 175,
            duration: 300
        }).start()
    }

    const animateEnd = () => {
        Animated.timing(borderRadiusAnim, {
            toValue: 50,
            duration:300
        }).start()
        Animated.timing(size, {
            toValue:47,
            duration:300
        }).start()
        Animated.timing(containerHeight, {
            toValue: 75,
            duration: 300
        }).start()

    }

    const playSoundEffect = async () => {
        if(recording){
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/beep_down.wav')
            );
    
            setSoundEffect(sound);
            
            return sound.playAsync();    

        } else {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/beep_up.wav')
            );
    
            setSoundEffect(sound);
            
            return sound.playAsync();    
        }
    }

    return(
        <Animated.View style={{borderTopLeftRadius:10,borderTopRightRadius:10,alignItems:'center',height:containerHeight,width:'100%',backgroundColor:'#444B49', flexDirection:'column',justifyContent:'space-evenly'}}>
            
            {
            isRecording && 
            <>

            <Visualizer 
            barValues={barValues} />
            
            <Timer 
            duration = {durationMillis} />

            </>
            }

            <View style={{width:60,height:60,backgroundColor:'transparent',marginTop:'auto',borderWidth:3,borderColor:'gray',borderRadius:50,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={handleRecording} style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                    <Animated.View style={{width:size,height:size,backgroundColor:'red',borderRadius:borderRadiusAnim}}/>
                </TouchableOpacity>
            </View>
            

        </Animated.View>
    )
}

export default Recorder;






