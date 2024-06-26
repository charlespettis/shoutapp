import React from 'react';
import { TouchableOpacity, Image} from 'react-native';
import DefaultAvatar from '../../assets/images/defaultAvatar.png';
import * as ImagePicker from 'expo-image-picker';

const UserAvatar = props => {

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: .5,
        });
    
        if (!result.cancelled) {
          if(props.onPickImage) props.onPickImage(result.uri); 
        }
    };

    return(
        <>
            <TouchableOpacity
            style={props.style}
            onPress={pickImage}
            >
            <Image
                style={[{height:100,width:100,borderRadius:100}, props.imageStyle]}
                source={props.source ? props.source : DefaultAvatar}
            />
            </TouchableOpacity>
        </>
    )
}

export default UserAvatar;