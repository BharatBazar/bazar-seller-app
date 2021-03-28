import * as React from 'react';
import { View } from 'react-native';
import { colorCode } from '../../common/color';
import { commonStyles, MH, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';

export interface WelcomeProps {}

export interface WelcomeState {}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    render() {
        return (
            <ScreenHOC>
                <View style={{ flex: 1 }}>
                    <WrappedText text={'Bharat Bazar'} />
                    <WrappedRectangleButton
                        containerStyle={[PH(), PV(), MH(), commonStyles.alcjcc, { backgroundColor: colorCode.CHAKRA }]}
                    >
                        <WrappedText text={'Already a shop member??'} textColor={colorCode.WHITE} />
                    </WrappedRectangleButton>
                </View>
            </ScreenHOC>
        );
    }
}

export default Welcome;
