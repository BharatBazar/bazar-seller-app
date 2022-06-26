import { AIC, FDR, FLEX, JCC, PH, PV } from '@app/common/styles';
import * as React from 'react';
import { View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import ProductDetailsHeading from './ProductDetailsHeading';
import { mainColor } from '@app/common/color';

interface TextSwitchProps {
    heading: string;
    subHeading: string;
    children?: any;
    onToggle: Function;
    initialValue: boolean;
}

const offColor = mainColor + '33';

const TextSwitch = React.forwardRef<{ setOn: Function }, TextSwitchProps>(
    ({ heading, subHeading, children, onToggle, initialValue }, ref) => {
        const [isOn, setOn] = React.useState(false);

        React.useImperativeHandle(ref, () => ({
            setOn,
        }));

        React.useEffect(() => {
            setOn(initialValue);
        }, [initialValue]);

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
    },
);

export default TextSwitch;
