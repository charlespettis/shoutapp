import React from 'react';
import {View, Text, Image, StyleSheet,TouchableWithoutFeedback, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {env,timeSince} from '../../misc';
import {GlobalPlayerContext} from '../contexts/GlobalPlayerProvider';
import { UserContext } from '../contexts/UserProvider';
import {like, flag} from '../../api/post';
import { useNavigation } from '@react-navigation/native';
import { PostsContext } from '../contexts/PostsProvider';

const Post = props => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    const {userState, userFunctions} = React.useContext(UserContext);
    const {posts, postFunctions} = React.useContext(PostsContext);
    const [isLiked, setIsLiked] = React.useState(false);
    const navigation = useNavigation();

    const play = () => {
        playerFunctions.play(props)
    }
    
    React.useEffect(()=>{
        const index = props.likes.findIndex(e => e.UserId === userState.id);
        if(index > -1){
            setIsLiked(true);
        }
    },[])

    const handleLike = () => {
        like({id: props.id})
        .then(status => {
            if(status === 200){
                setIsLiked(!isLiked);
            }
        })
    }
    
    const handleFlag = () => {
        Alert.alert(
            'Report as Inappropriate',
            "Are you sure you'd like to report this post as hateful, abusive, or spam content?",
            [
                {
                    text: "Cancel",
                    style:'cancel'
                },
                {
                    text: "Confirm",
                    onPress: ()=> flag({id: props.id}),
                    style: 'default'
                }
            ]
        )
    }
    const handleViewProfile = () => {
        navigation.navigate('ViewUserProfile', {id: props.userId})
    }

    const handleDelete = () => {
        Alert.alert(
            'Report as Inappropriate',
            "Are you sure you'd like to permanently delete this post?",
            [
                {
                    text: "Cancel",
                    style:'cancel'
                },
                {
                    text: "Confirm",
                    onPress: ()=> postFunctions.deletePost({id: props.id}),
                    style: 'default'
                }
            ]
        )
    }

    return(
        <TouchableWithoutFeedback onPress={play}>
            <View style={[styles.container, player.id === props.id && !props.focused && {backgroundColor:'rgba(173,216,230,.2)'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri: `${env}${props.avatar}`}} style={styles.avatar} resizeMode='cover'/>
                    <View style={{marginLeft:15,justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:player.id === props.id && !props.focused ? 'lightblue' : 'white',fontSize:16,marginBottom:5,fontWeight:'300'}}>{props.fullName} </Text>
                        <Text style={{color:'white', color:'white',opacity:.7,fontSize:10, marginLeft:5}}>{timeSince(props.createdAt)}</Text>
                        </View>
                        <Text style={{color:'lightblue',marginBottom:5,fontWeight:'200'}}>@{props.username}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Ionicons onPress={handleLike} name={isLiked ? 'heart' : 'heart-outline'} color={isLiked ? 'red' : 'rgba(255,255,255,.7)'} size={22} style={{marginRight:15}}/>
                    <Ionicons onPress={handleViewProfile} name='person-outline' color='rgba(255,255,255,.7)' size={22} style={{marginRight:15}}/>
                    <Ionicons onPress={props.userId === userState.id || userState.admin ? handleDelete : handleFlag} name={ (props.userId === userState.id || userState.admin) ? 'trash-outline' : 'flag-outline'  } color='rgba(255,255,255,.7)' size={22}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10
        
    },
    avatar: {
        width:50,
        height:50,
    },
    wrapper: {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
    }
})

export default Post;