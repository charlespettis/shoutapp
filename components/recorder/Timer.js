import React from 'react';
import {Text} from 'react-native';

const Timer = props => {
    const [stopwatch, setStopwatch] = React.useState('0:00');

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        setStopwatch(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
    }

    React.useEffect(()=>{
        if(props.duration){
            millisToMinutesAndSeconds(props.duration)
        }

        return () => {
            setStopwatch('0:00');
        }
        
    },[props.duration])

    return(
        <Text style={{color:'white',fontSize:16}}>{stopwatch}</Text>
    )
}

export default Timer;