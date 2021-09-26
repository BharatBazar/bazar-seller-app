import { mainColor } from '@app/common/color';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { colorTransparency } from '../../common/styles';
//import {Bars} from "react-native-loader";

interface LoaderProps {
    backgroundColor?: string;
}

export default class Loader extends React.Component<LoaderProps, {}> {
    render() {
        return (
            <View
                style={{
                    zIndex: 999,
                    elevation: 1000,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: this.props.backgroundColor || '#FFFFFF' + colorTransparency[10],
                }}
            >
                {this.props.showCancelButton ? (
                    <View style={{ position: 'absolute', right: 10, top: 10 }}>
                        <TouchableOpacity
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                this.props.onPress();
                            }}
                        >
                            <EvilIcons
                                name="close"
                                size={30}
                                style={{
                                    //textAlign: "right",
                                    color: 'darkgray',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View />
                )}
                {/* <View
                    style={{
                        height: 50,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                        backgroundColor: 'black',
                        overflow: 'hidden',
                    }}
                > */}
                <ActivityIndicator color={mainColor} />
                {/* </View> */}
                {/* <Title>{"Loading Conversation"}</Title> */}
            </View>
        );
    }
}
