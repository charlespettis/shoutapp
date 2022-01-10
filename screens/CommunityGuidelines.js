import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Accordion } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';

const CommunityGuidelines = ({navigation,route}) => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
        
    return(
        <View style={{padding:10,flex:1, backgroundColor:'black'}}>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1,paddingBottom:100}}>
                    <Ionicons name='chevron-back' size={22} style={{marginLeft:0,marginTop:40,marginBottom:20}} color={'white'}  onPress={()=> navigation.goBack()}/>
                    <Text style={{color:'white',fontSize:22,marginBottom:10}}>Community Guidelines </Text>
                    <Text style={{color:'white'}}>
                        Last updated December 29, 2021
                    </Text>
                    <Text style={{color:'white',marginTop:10,marginBottom:10}}>
                    We here at Topic are dedicated to building an open, fun environment for you to express your ideas.  {'\n'}
                    Topic will never delete your post unless it violates our community guidelines as stated below.{'\n'}
                    </Text>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO HATE SPEECH
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text style={{color:'white',marginTop:10}}>
                                    We have a zero tolerance policy for any kind of hate speech on our platform.
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO SPAM
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text style={{color:'white',marginTop:10}}>
                                    This could be anything from tasteless self-promotion, to very annoying and repetitve or simply incomprehensible content. 
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO SLANDEROUS OR DEFAMATORY CONTENT
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text style={{color:'white',marginTop:10}}>
                                    Any wild and unproven remarks on an otherwise innocent person with the intent to harm them will not be tolerated.
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO SOLICITING SUSPICIOUS OR ILLEGAL SERVICES AND GOODS
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text style={{color:'white',marginTop:10}}>
                                    Any suspicious solicitation of any service or good, by the judgement of one of our administrators, will have your post deleted and your account banned.
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO HARASSMENT OR BULLYING
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text style={{color:'white',marginTop:10}}>
                                    Any hateful and downright disrespectful content towards any one person or body of people will not be tolerated.
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                    </Accordion>

                </View>
            </ScrollView>
        </View>
    )
}

export default CommunityGuidelines;