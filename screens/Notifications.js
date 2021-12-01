import React from 'react';
import {View, Image, Text, FlatList, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import Snake from '../assets/images/snake.jpg';


const Notifications = () => {

    const renderItem = ({item}) => (
        <NotificationCard
            acknowledged={item.acknowledged}
            message={item.message}
            avatar={item.avatar}
        />
    )

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:"white",alignSelf:'flex-start',fontSize:20,marginTop:20,marginBottom:20}}>What You've Missed</Text>
                <TouchableOpacity>
                <Text style={{color:'white',fontSize:14}}>Clear All</Text>
                </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    style={{height:'100%'}}
                />
            </View>
        </SafeAreaView>
    )
}

const NotificationCard = props => {
    return(
    <View style={[styles.card, {backgroundColor: props.acknowledged ? 'transparent' : 'rgba(137, 196, 244,.35)'}]}>
    <Image 
        source={props.avatar}
        resizeMode='cover'
        style={styles.cardImage}
    />
    <Text style={{color:'white'}}>{props.message}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1D201F',
        alignItems:'center'
    },
    wrapper:{
        width: '90%'
    },
    card: {
        height:100,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        opacity:.9,
        marginTop:15
    },
    cardImage:{
        height:70,
        width:70,
        borderRadius:100,
        marginRight:10,
        marginLeft:10
    }
})

const data = [
    {
     avatar: Snake,
     acknowledged: false,
     message: "Someone liked your post!"
    },
    {
    avatar: Snake,
    acknowledged: false,
    message: "Someone liked your post!"
    },
    {
    avatar: Snake,
    acknowledged: true,
    message: "Someone liked your post!"
    }
]

export default Notifications;
