import { AIC, BGCOLOR, colorTransparency, FDR, FLEX, JCC, PH, provideShadow, PV } from '@app/common/styles';
import * as React from 'react';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import WrappedText from '@app/screens/component/WrappedText';
import ToggleSwitch from 'toggle-switch-react-native';
import Product from '@app/screens/app/listing/Main';
import ProductDetailsHeading from './ProductDetailsHeading';
import { mainColor } from '@app/common/color';

interface TextSwitchProps {
    heading: string;
    subHeading: string;
    children?: any;
    onToggle: Function;
}

const offColor = mainColor + '33';

const TextSwitch: React.FunctionComponent<TextSwitchProps> = ({ heading, subHeading, children, onToggle }) => {
    const [isOn, setOn] = React.useState(false);

    return (
        <View style={[PV(0.2)]}>
            <View style={[FDR(), AIC(), JCC('space-between'), FLEX(1)]}>
                <View style={[FLEX(1)]}>
                    <ProductDetailsHeading heading={heading} subHeading={subHeading} />
                </View>
                <View style={[PH(0.1)]}>
                    <ToggleSwitch
                        isOn={isOn}
                        onColor={mainColor}
                        size={'medium'}
                        onToggle={(isOn) => {
                            setOn(isOn);
                            onToggle(isOn);
                        }}
                    />
                </View>
            </View>
            {children && children}
        </View>
    );
};

export default TextSwitch;
