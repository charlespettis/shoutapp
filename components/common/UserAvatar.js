import React from 'react';
import { TouchableOpacity, Image} from 'react-native';
import DefaultAvatar from '../../assets/images/defaultAvatar.png';
import * as ImagePicker from 'expo-image-picker';
import {UserContext} from '../contexts/UserProvider';

const UserAvatar = props => {
    const [image, setImage] = React.useState(null)
    const {userFunctions, userState} = React.useContext(UserContext)

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
          console.log(result);
          userFunctions.updateUserInfo({
              avatar: result.uri
          })
        }
    };

    return(
        <>
            <TouchableOpacity
            style={props.style}
            onPress={pickImage}
            >
            <Image

                style={{height:100,width:100,borderRadius:100}}
                source={image ? {uri:image} : DefaultAvatar}
            />
            </TouchableOpacity>
        </>
    )
}

export default UserAvatar;