import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Accordion } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalPlayerContext } from '../components/contexts/GlobalPlayerProvider';

const TermsAndConditions = ({navigation, route}) => {
    const {player, playerFunctions} = React.useContext(GlobalPlayerContext);
    
    React.useEffect(()=>{
        const lower = navigation.addListener('focus', () => {
            playerFunctions.lower();
        })
        const raise = navigation.addListener('blur', () => {
            playerFunctions.raise();
        })

        return () => ({lower, raise})

    },[navigation])

    return(
        <View style={{padding:10,flex:1, backgroundColor:'black'}}>
            <ScrollView style={{flex:1}}>
                <View style={{flex:1,paddingBottom:100}}>
                    <Ionicons name='chevron-back' size={22} style={{marginLeft:0,marginTop:40,marginBottom:20}} color={'white'}  onPress={()=> navigation.goBack()}/>
                    <Text style={{color:'white',fontSize:22,marginBottom:10}}>
                        END USER LICENSE AGREEMENT
                    </Text>
                    <Text style={{color:'white'}}>
                        Last updated December 14, 2021
                    </Text>
                    <Text style={{color:'white',marginTop:10,marginBottom:10}}>
                        Topic is licensed to You (End-User) by Charles Pettis, located at 18 Atkinson Street, Dover, New Hampshire 03820, United States (hereinafter: Licensor), for use only under the terms of this License Agreement.
                        By downloading the Application from the Apple AppStore, and any update thereto (as permitted by this License Agreement), You indicate that You agree to be bound by all of the terms and conditions of this License Agreement, and that You accept this License Agreement.
                        The parties of this License Agreement acknowledge that Apple is not a Party to this License Agreement and is not bound by any provisions or obligations with regard to the Application, such as warranty, liability, maintenance and support thereof. Charles Pettis, not Apple, is solely responsible for the licensed
                        Application and the content thereof.
                        This License Agreement may not provide for usage rules for the Application that are in conflict with the latest App Store Terms of Service. Charles Pettis acknowledges that it had the opportunity to review said terms and this License Agreement is not conflicting with them.
                        All rights not expressly granted to You are reserved.                
                    </Text>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    THE APPLICATION
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                            <Text style={{color:'white'}}>
                                Topic (hereinafter: Application) is a piece of software created to Provide a news media service for mobile users - and customized for Apple mobile devices. It is used to Contribute to and consume content based around news event via short audio clips.
                                The Application is not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use this Application. You may not use the
                                Application in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                            </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    SCOPE OF LICENSE
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                            <Text style={{color:'white'}}>
                                2.1 You are given a non-transferable, non-exclusive, non-sublicensable license to install and use the Licensed Application on any Apple-branded Products that You (End-User) own or control and as permitted by the Usage Rules set forth in this section and the App Store Terms of Service, with the exception
                                that such licensed Application may be accessed and used by other accounts associated with You (End-User, The Purchaser) via Family Sharing or volume purchasing.
                                2.2 This license will also govern any updates of the Application provided by Licensor that replace, repair, and/or supplement the first Application, unless a separate license is provided for such update in which case the terms of that new license will govern.
                                2.3 You may not share or make the Application available to third parties (unless to the degree allowed by the Apple Terms and Conditions, and with Charles Pettis's prior written consent), sell, rent, lend, lease or otherwise redistribute the Application.
                                2.4 You may not reverse engineer, translate, disassemble, integrate, decompile, integrate, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Application, or any part thereof (except with Charles Pettis's prior written consent).
                                2.5 You may not copy (excluding when expressly authorized by this license and the Usage Rules) or alter the Application or portions thereof. You may create and store copies only on devices that You own or control for backup keeping under the terms of this license, the App Store Terms of Service, and any
                                other terms and conditions that apply to the device or software used. You may not remove any intellectual property notices. You acknowledge that no unauthorized third parties may gain access to these copies at any time.
                                2.6 Violations of the obligations mentioned above, as well as the attempt of such infringement, may be subject to prosecution and damages.
                                2.7 Licensor reserves the right to modify the terms and conditions of licensing.                            
                            </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    NO MAINTENANCE OR SUPPORT
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    4.1 Charles Pettis is not obligated, expressed or implied, to provide any maintenance, technical or other support for the Application.
                                    4.2 Charles Pettis and the End-User acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the licensed Application.                            
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    USER GENERATED CONTRIBUTIONS
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    The Application may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or in the Application,
                                    including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Application and through third-party websites or applications. As such, any
                                    Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
                                    1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.
                                    2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Application, and other users of the Application to use your Contributions in any manner contemplated by the Application and these Terms of Use.
                                    3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness or each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the
                                    Application and these Terms of Use.
                                    4. Your Contributions are not false, inaccurate, or misleading.
                                    5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.
                                    6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).
                                    7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.
                                    8. Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.
                                    9. Your Contributions do not violate any applicable law, regulation, or rule.
                                    10. Your Contributions do not violate the privacy or publicity rights of any third party.
                                    11. Your Contributions do not contain any material that solicits personal information from anyone under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.
                                    12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.
                                    13. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.
                                    14. Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.
                                    Any use of the Application in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Application.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    CONTRIBUTION LICENSE
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    By posting your Contributions to any part of the Application or making Contributions accessible to the Application by linking your account from the Application to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an
                                    unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use copy, reproduce, disclose, sell, resell, publish, broad cast, retitle, archive, store, cache, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and
                                    distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Contributions, and grant and authorize sublicenses of the foregoing. The use and distribution may
                                    occur in any media formats and through any media channels.
                                    This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive
                                    all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.
                                    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any
                                    area in the Application. You are solely responsible for your Contributions to the Application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.
                                    We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations in the Application; and (3) to pre-screen or delete any Contributions at any time and for any reason, without
                                    notice. We have no obligation to monitor your Contributions.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    WARRANTY
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    8.1 Licensor warrants that the Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Application works as described in the user documentation.
                                    8.2 No warranty is provided for the Application that is not executable on the device, that has been unauthorizedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by third parties, or if
                                    there are any other reasons outside of Charles Pettis's sphere of influence that affect the executability of the Application.
                                    8.3 You are required to inspect the Application immediately after installing it and notify Charles Pettis about issues discovered without delay by e-mail provided in Product Claims. The defect report will be taken into consideration and further investigated if it has been mailed within a period of 6 days after discovery.
                                    8.4 If we confirm that the Application is defective, Charles Pettis reserves a choice to remedy the situation either by means of solving the defect or substitute delivery.
                                    8.5 In the event of any failure of the Application to conform to any applicable warranty, You may notify the App-Store-Operator, and Your Application purchase price will be refunded to You. To the maximum extent permitted by applicable law, the App-Store-Operator will have no other warranty obligation
                                    whatsoever with respect to the App, and any other losses, claims, damages, liabilities, expenses and costs attributable to any negligence to adhere to any warranty.
                                    8.6 If the user is an entrepreneur, any claim based on faults expires after a statutory period of limitation amounting to twelve (12) months after the Application was made available to the user. The statutory periods of limitation given by law apply for users who are consumers.                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    PRODUCT CLAIMS
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    Charles Pettis and the End-User acknowledge that Charles Pettis, and not Apple, is responsible for addressing any claims of the End-User or any third party relating to the licensed Application or the End-User’s possession and/or use of that licensed Application, including, but not limited to:
                                    (i) product liability claims;
                                    (ii) any claim that the licensed Application fails to conform to any applicable legal or regulatory requirement; and
                                    (iii) claims arising under consumer protection, privacy, or similar legislation, including in connection with Your Licensed Application’s use of the HealthKit and HomeKit.                            
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    LEGAL COMPLIANCE
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    You represent and warrant that You are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country; and that You are not listed on any U.S. Government list of prohibited or restricted parties.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    CONTACT INFORMATION
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                For general inquiries, complaints, questions or claims concerning the licensed Application, please contact:{'\n\n'}
                                Charles Pettis{'\n'}
                                18 Atkinson Street{'\n'}
                                Dover, NH 03820{'\n'}
                                United States{'\n'}
                                charlespettisappdevelopment@gmail.com                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>

                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    TERMINATION
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    The license is valid until terminated by Charles Pettis or by You. Your rights under this license will terminate automatically and without notice from Charles Pettis if You fail to adhere to any term(s) of this license. Upon License termination, You shall stop all use of the Application, and destroy all copies, full or
                                    partial, of the Application.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    Charles Pettis represents and warrants that Charles Pettis will comply with applicable third-party terms of agreement when using licensed Application.
                                    In Accordance with Section 9 of the "Instructions for Minimum Terms of Developer's End-User License Agreement," Apple and Apple's subsidiaries shall be third-party beneficiaries of this End User License Agreement and - upon Your acceptance of the terms and conditions of this license agreement, Apple
                                    will have the right (and will be deemed to have accepted the right) to enforce this End User License Agreement against You as a third-party beneficiary thereof.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    INTELLECTUAL PROPERTY RIGHTS
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    Charles Pettis and the End-User acknowledge that, in the event of any third-party claim that the licensed Application or the End-User's possession and use of that licensed Application infringes on the third party's intellectual property rights, Charles Pettis, and not Apple, will be solely responsible for the
                                    investigation, defense, settlement and discharge or any such intellectual property infringement claims.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    APPLICABLE LAW
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    This license agreement is governed by the laws of the State of New Hampshire excluding its conflicts of law rules.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>
                        <Accordion.Item>
                            <Accordion.Summary>
                                <Text style={{color:'white'}}>
                                    MISCELLANEOUS
                                </Text>
                            </Accordion.Summary>
                            <Accordion.Details >
                                <Text style={{color:'white'}}>
                                    16.1 If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.
                                    16.2 Collateral agreements, changes and amendments are only valid if laid down in writing. The preceding clause can only be waived in writing.                                
                                </Text>
                            </Accordion.Details>
                        </Accordion.Item>


                    </Accordion>


                </View>
            </ScrollView>
        </View>
    )
}

export default TermsAndConditions;