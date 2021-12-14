import React from 'react';
import { Animated, Dimensions, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';
import Visualizer from './Visualizer';
import Timer from './Timer';
import Player from '../player';
import TouchableIcon from '../common/TouchableIcon';
import RecordButton from './RecordButton';
import PropTypes from 'prop-types';

const Recorder = props => {

    const borderRadiusAnim = React.useRef(new Animated.Value(50)).current;
    const size = React.useRef(new Animated.Value(45)).current;
    const containerHeight = React.useRef(new Animated.Value(80)).current

    const [isRecording, setIsRecording] = React.useState(false);
    const [recording, setRecording] = React.useState();
    const [recordingPath, setRecordingPath] = React.useState();
    const [barValues, _setBarValues] = React.useState([]);
    const [soundEffect, setSoundEffect] = React.useState();
    const [durationMillis, setDurationMillis] = React.useState();

    const barValuesRef = React.useRef(barValues)
    const setBarValues = data => {
        barValuesRef.current = data;
        _setBarValues(data)
    }

    const screenWidth = Dimensions.get('screen').width;

    const toggleRecording = () => {
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
        if(props.onRecordingStart) props.onRecordingStart();
        playSoundEffect()
        setTimeout(async ()=>{
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        
            }); 
            const { recording } = await Audio.Recording.createAsync(
                {
                    isMeteringEnabled:true,
                    ios: {
                        extension: '.wav',
                        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                        sampleRate: 44100,
                        numberOfChannels: 2,
                        bitRate: 128000,
                    },
                    android: {
                        extension: '.wav',
                        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
    
                    }
    
                }
            );
            recording.setProgressUpdateInterval(40)
            const startTime = new Date();
            recording.setOnRecordingStatusUpdate(e => {
                const newValue = interpolateMeterValue(e.metering)
                setDurationMillis(e.durationMillis);
                
                setBarValues(prevState => {
                    endTime = new Date();
                    var timeDiff = endTime - startTime; 
                    if( timeDiff >= 5000  ){
                        const newData = prevState.slice(0,prevState.length - 1);
                        const response = [newValue, ...newData]
                        return response
                    } else {
                        return [ newValue, ...prevState]
                    }
                })                
    
            })
            setRecording(recording);
    
        },350)

    }
    const stopRecording = async () => {
        if(props.onRecordingStop) props.onRecordingStop();
        setRecording(undefined);
        setBarValues([]);
        playSoundEffect();
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingPath(uri);
    }

    const animateStart = () => {
        Animated.timing(borderRadiusAnim, {
            toValue: 3,
            duration:300,
            useNativeDriver:false
        }).start()
        Animated.timing(size, {
            toValue:25,
            duration:300,
            useNativeDriver:false
        }).start()
        Animated.timing(containerHeight, {
            toValue: 175,
            duration: 300,
            useNativeDriver:false
        }).start()
    }

    const animateEnd = () => {
        Animated.timing(borderRadiusAnim, {
            toValue: 50,
            duration:300,
            useNativeDriver:false
        }).start()
        Animated.timing(size, {
            toValue:45,
            duration:300,
            useNativeDriver:false
        }).start()
        Animated.timing(containerHeight, {
            toValue: 80,
            duration: 300,
            useNativeDriver:false
        }).start()

    }

    const playSoundEffect = async () => {
        if(recording){
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/beep_down.wav')
            );
            setSoundEffect(sound);
            return soundEffect.playAsync();    
        } else {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sounds/beep_up.wav')
            );
            setSoundEffect(sound);
            return soundEffect.playAsync();    
        }
    }

    const interpolateMeterValue = rawMeterValue => {
        const oldMin = -60;
        const oldMax = 0;
        const newMin = 0;
        const newMax = 50;
        return ((rawMeterValue - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    }

    const resetRecording = () => {
        setRecordingPath(null);
        if(props.onReset) props.onReset();
    }

    const submit = () => {
        props.onSubmit(recordingPath)
    }

    React.useEffect(()=>{
        return async () => {
            soundEffect && soundEffect.unloadAsync();
        }
    },[soundEffect])


    return(
        <Animated.View style={[styles.container, {height:containerHeight}, {...props.style}]}>
            {
            !recordingPath ? 
                <>
                    {
                    isRecording && 
                    <>
                        <Visualizer 
                        barValues={barValues}
                        />
                        <Timer 
                        duration = {durationMillis}
                        />
                    </>
                    }
                    <RecordButton
                    size={size}
                    borderRadiusAnim={borderRadiusAnim}
                    onPress={toggleRecording}
                    />
                </>
            :
            <Player 
                leftIcon={
                    <TouchableIcon
                        onPress={resetRecording}
                        name="trash-outline"
                        color="#FF4747"
                        size={24}
                        style={{marginLeft:15}}
                    />
                }
                rightIcon={
                    <TouchableIcon
                        name='checkmark'
                        color='lightgreen'
                        size={24}
                        onPress={submit}
                        style={{marginRight:15}}

                    />
                }
                recording={recordingPath}
            />
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        alignItems:'center',
        width:'100%',
        backgroundColor:'#1C1C1E', 
        flexDirection:'column',
        justifyContent:'space-evenly',
    }
})

export default Recorder;

Recorder.propTypes = {
    onSubmit: PropTypes.func,
    onRecordingStart: PropTypes.func,
    onRecordingStop: PropTypes.func
}




