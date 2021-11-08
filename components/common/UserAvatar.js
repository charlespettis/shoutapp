import React from 'react';
import { TouchableOpacity, View} from 'react-native';
import {Avatar} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Basic from '../../assets/images/defaultAvatar.png';
import {Ionicons} from '@expo/vector-icons';

const UserAvatar = () => {
    const [image, setImage] = React.useState(null)

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
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    return(
        <>
            <TouchableOpacity
            onPress={pickImage}
            >
            <Avatar

                size='xl'
                source={{uri:image}}
            />
            <Ionicons name='brush' size={22} color='cyan' style={{alignSelf:'flex-end',top:'-10%'}}/>
            </TouchableOpacity>
        </>
    )
}

export default UserAvatar;