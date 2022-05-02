import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { AIC, FDR, MT, FLEX, ML, DSP, provideShadow, BGCOLOR } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle, absoluteBottomWrapper } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs13, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import { createShopMember, triggerOtp, updateShopMember } from '../../server/apis/shopMember/shopMember.api';
import {
    IRCheckPhoneNumber,
    IRCreateShopMember,
    IshopMember,
    shopMemberRole,
} from '../../server/apis/shopMember/shopMember.interface';
import ServerErrorText from './component/errorText';
import { emailValidation, mobileValidation } from '../../common';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import { Storage, StorageItemKeys } from '../../storage';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import capatailize from '@app/common/capatalize';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


export interface CreateDukanProps extends NavigationProps {
    route: {
        params: {
            update: boolean;
            details: formState;
            updateCallback: (details: IshopMember) => void;
        };
    };
}

    

type formState = {
    phoneNumber: string;
    otp: string;
    firstName: string;
    lastName: string;
    email: string;
};

type formError = {
    phoneNumber?: string;
    generalError?: string;
    serverError?: string|null;
    firstNameError?: string;
    lastNameError?: string;
    emailError?: string;
    otpError?: string;
};
export interface CreateDukanState {
    otpSent: boolean;
    signInButtonState: number;
    otpButtonState: number;
    formState: formState;
    error: formError;
    timer: number;
    update?: boolean;
    backButton?:boolean;
  
}

class CreateDukan extends React.Component<CreateDukanProps, CreateDukanState> {
    private timer: NodeJS.Timeout;

    constructor(props: CreateDukanProps) {
        super(props);

        this.state = {
            otpSent: false,
            signInButtonState: 0,
            otpButtonState: 1,
            formState: { phoneNumber: '', otp: '', firstName: '', email: '', lastName: '' },
            error: {},
            timer: -1,
            update: props.route.params && props.route.params.update,
            backButton:false,
  
           
        };

    //  console.log(this.props.navigation.getState().routes);


    }

    
    setField = (field: keyof formState, value: string) => {
        this.setState((prevState) => {
            prevState.formState[field] = value;
            // console.log("KKKKKKKKKK");this.state.formState
        if(this.state.formState.email.length>0 && this.state.formState.firstName.length>0 && this.state.formState.lastName.length>0
            && this.state.formState.otp.length>0 &&this.state.formState.phoneNumber.length>0   ){
                this.setState({backButton:true})
            }
            else{
                this.setState({backButton:false})
            }
            return prevState;
        });
    };

    setTimer = () => {
        this.timer = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
        }, 1000);
    };

    

    clearTimeOut = () => {
        clearInterval(this.timer);
    };

    submitDetails = async () => {
        this.setState({ signInButtonState: 2 });
        try {
            const response: IRCreateShopMember = this.state.update
                ? await updateShopMember({
                      ...this.state.formState,
                      role: shopMemberRole.Owner,
                  })
                : await createShopMember({
                      ...this.state.formState,
                      role: shopMemberRole.Owner,
                  });
            if (response.status == 1) {
                if (!this.state.update) {
                    console.log('awaiting'); //add garvit
                    await Storage.setItem(StorageItemKeys.Token, 'token exists');
                    await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, 'false');
                    await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.SETPASSWORD);
                    await Storage.setItem(StorageItemKeys.userDetail, response.payload);
                    this.props.navigation.replace(NavigationKey.SETPASSWORD, { ownerDetails: response.payload });
                } else {
                    this.props.route.params.updateCallback({ ...this.state.formState, role: shopMemberRole.Owner });
                    this.props.navigation.goBack();
                }

                this.setState({ signInButtonState: 0 });
            } else {
                this.setState({ error: { ...this.state.error, serverError: response.message }, signInButtonState: 0 });
            }
        } catch (error) {
            this.setState({ error: { ...this.state.error, serverError: error.message }, signInButtonState: 0 });
        }
    };

    

    validateFields = () => {
        const { formState, otpSent } = this.state;
        const { phoneNumber, otp, email, firstName, lastName } = formState;
        let error: formError = {};
        if (otpSent && otp.length < 6) {
            // error['otpError'] = ErrorText.otpError;
            // setTimeout(() => {
            //     error["otpError"] = ""
            // }, 1000);
        }
        if (!mobileValidation.test(phoneNumber)) {
            // error['phoneNumber'] = ErrorText.phoneNumberError;
            // setTimeout(() => {
            //     error["phoneNumber"] = ""
            // }, 1000);
        }
        if (!emailValidation.test(email)) {
            // error['emailError'] = ErrorText.emailError;
            // setTimeout(() => {
            //     error["emailError"] = ""
            // }, 1000);
        }
        if (firstName.length < 3) {
            // error['firstNameError'] = ErrorText.firstNameError;
            // setTimeout(() => {
            //     error["firstNameError"] = ""
            // }, 1000);
        }
        if (lastName.length < 3) {
            // error['lastNameError'] = ErrorText.lastNameError;
            // setTimeout(() => {
            //     error["lastNameError"] = ""
            // }, 1000);
        }

        if (Object.keys(error).length == 0) {
            
           
            this.submitDetails();
        } else {
            this.setState({ error: error });
        }
    };
    

    async sendOtp() {
        try {
            this.setState({ otpButtonState: 2 });
            const response: IRCheckPhoneNumber = await triggerOtp({
                phoneNumber: this.state.formState.phoneNumber,
            });
            if (response.status == 1) {
                this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
                this.setTimer();
                this.setField('otp', response.payload);
            }
        } catch (error) {
        
                this.setState({ otpSent: false, timer: -1, otpButtonState: -1, error: { serverError: error.message } });
                setTimeout(() => {
                    this.setState({error:{}})
                    
                }, 1500);
    }
    }

    

    componentDidUpdate() {
        if (this.state.timer == 0) {
            this.clearTimeOut();
            this.setState({ otpButtonState: 0, timer: -1 });
        }
    }

    
    checkPhoneNumber = (phoneNumber: string) => {
        if (mobileValidation.test(phoneNumber)) {
            this.setState((prevState) => {
                delete prevState.error['phoneNumber'];
                return prevState;
            });
            this.setField('otp', '');
         
            this.sendOtp();
        } else {
            this.setState({ error: { ...this.state.error, phoneNumber: ErrorText.phoneNumberError } });
        }
    };

    componentWillUnmount() {
        this.clearTimeOut();
    }

    returnErrorText = (field: keyof formError) => {
    const { error } = this.state;
        return field in error ? <ServerErrorText errorText={error[field]} /> : <View />;    
    };

    componentDidMount() {
        if (this.state.update) {
            this.setState({ formState: { ...this.props.route.params.details, otp: '' } });
        }

        
      
    }

   
    render() {
        const componentProps = {
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
            textInputProps: {
                containerStyle: [textInputContainerStyle, MT(0.2)],
                textInputStyle: { fontSize: fs13, color: '#00000099' },
                paddingLeft: getWP(0.2),
            },
        };
   

        const { details } = this.props.route.params;

        const {
            otpSent,
            signInButtonState,
            otpButtonState,
            formState: { phoneNumber, otp, firstName, email, lastName },
            error,
            timer,
            update,
        } = this.state;
        //console.log(details.phoneNumber, phoneNumber, update);

        return (
            
            <ScrollView
                style={[
                    {
                        flex: 1,
                        padding: DSP,
                        paddingTop: update ? STATUS_BAR_HEIGHT + DSP : DSP,
                        backgroundColor: '#FFFFFF',
                    },
                ]}
            >

                {this.state.backButton ?(
                 undefined
                ):(<WrappedFeatherIcon
                    onPress={() => {
                      this.props.navigation.goBack();
                  }}
                     
                      iconName={'arrow-left'}
                      iconColor="#000"
                      containerHeight={getHP(0.5)}
                      containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                  />)}
                
                <HeaderText
                    step={update ? undefined : 'Step 1'}
                    heading={update ? CreateDukanText.UPDATE_HEADING : CreateDukanText.HEADING}
                    subHeading={CreateDukanText.MESSAGE}
                />
                {
                this.state.formState.phoneNumber.length <10 ?
                null:
                (
                    (this.returnErrorText('serverError'))
                )
                 
                }
                <View style={{}}>
                    <View style={[FDR(), AIC()]}>
                        <View style={{ flex: 1 }}>
                            <WrappedTextInput
                                placeholder={CreateDukanText.ownerMobileNumber}
                                value={phoneNumber}
                                onChangeText={(phoneNumber) => {
                                    this.setField('phoneNumber', phoneNumber);
                                    if (update && phoneNumber == details.phoneNumber) {
                                        this.setState({ otpSent: false });
                                    }
                                }}
                                {...componentProps.textInputProps}
                                errorText={error['phoneNumber']}
                                maxLength={10}
                                keyBoard="numeric"
                            />
                        </View>
                    </View>

                    {((update && phoneNumber != details.phoneNumber) || !update) && (
                        <TextButton
                            text={
                                otpSent
                                    ? CreateDukanText.resendOTp + (timer > 0 ? 'in ' + timer + 's' : '')
                                    : CreateDukanText.sendOtp
                            }
                            textProps={componentProps.buttonTextProps}
                            containerStyle={[
                                buttonContainerStyle,
                                { alignSelf: 'flex-end', paddingHorizontal: '2%', marginTop: getHP(0.1) },
                            ]}
                            onPress={() => {
                                this.checkPhoneNumber(this.state.formState.phoneNumber);
                            }}
                            isLoading={otpButtonState == 2 ? true : false}
                            disabled={otpButtonState == 2 || timer > 0}
                        />
                    )}
                    {otpSent && (
                        <>
                            <WrappedTextInput
                                placeholder={CreateDukanText.verificationOtp}
                                value={otp}
                                {...componentProps.textInputProps}
                                onChangeText={(otp) => this.setField('otp', otp)}
                                errorText={error['otpError']}
                            />
                            {otpSent && (
                                <WrappedText text={CreateDukanText.otpMessage} fontSize={10} textColor={messageColor} />
                            )}
                        </>
                    )}

                    {((!update && otpSent) ||
                        (update && phoneNumber != details.phoneNumber && otpSent) ||
                        (update && phoneNumber == details.phoneNumber)) && (
                        <>
                            <View style={[FDR()]}>
                                <View style={[FLEX(1)]}>
                                    <WrappedTextInput
                                        value={firstName}
                                        placeholder={CreateDukanText.ownerFirstName}
                                        // onChangeText={(firstName) => this.setField('firstName', capatailize(firstName))}
                                        onChangeText={(firstName) => this.setField('firstName',firstName)}
                                        autoCapitalize={"words"}

                                        errorText={error['firstNameError']}
                                        {...componentProps.textInputProps}
                                        
                                    />
                                </View>
                                <View style={[FLEX(1), ML(0.1)]}>
                                    <WrappedTextInput
                                        value={lastName}
                                        placeholder={CreateDukanText.ownerLastName}
                                        // onChangeText={(lastName) => this.setField('lastName', capatailize(lastName))}
                                        onChangeText={(lastName) => this.setField('lastName',lastName)}
                                        autoCapitalize="words"
                                        errorText={error['lastNameError']}
                                        {...componentProps.textInputProps}
                                    />
                                </View>
                            </View>
                            <WrappedText
                                text={CreateDukanText.ownerNameMessage}
                                fontSize={10}
                                textColor={messageColor}
                            />
                            <WrappedTextInput
                                placeholder={CreateDukanText.ownerEmail}
                                value={email}
                                onChangeText={(email) => this.setField('email', email)}
                                errorText={error['emailError']}
                                autoCapitalize={"none"}
                                {...componentProps.textInputProps}
                            />
                            <WrappedText
                                text={CreateDukanText.ownerEmailMessage}
                                fontSize={10}
                                textColor={messageColor}
                            />
                            <TextButton
                                // text={CreateDukanText.SignIn}
                                text={
                                    update
                                        ? 'Update details'
                                        : `Add ${firstName.length > 0 ? firstName + ' as ' : 'as '}Owner`
                                }
                                textProps={componentProps.buttonTextProps}
                                containerStyle={buttonContainerStyle}
                                onPress={() => {
                                    this.validateFields();
                                }}
                                isLoading={signInButtonState == 2 ? true : false}
                                disabled={signInButtonState == 2}
                            />
                        </>
                    )}
                </View>
            </ScrollView>
        );
    }
}

export default CreateDukan;

const styles = StyleSheet.create({
    buttonsWrapper: {
        ...absoluteBottomWrapper,
        bottom: '5%',
    },
});
