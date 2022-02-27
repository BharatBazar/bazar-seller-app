import ModalHOC from '@app/screens/hoc/ModalHOC';
import * as React from 'react';
import { View } from 'react-native';
import Size from './Size';

interface SizeUpdatePopupProps {
    isVisible: boolean;
    setPopup: Function;
    updateSize: Function;
}

const SizeUpdatePopup: React.FunctionComponent<SizeUpdatePopupProps> = ({ isVisible, setPopup, updateSize }) => {
    const [loader, setLoader] = React.useState(false);
    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <Size
                setLoader={setLoader}
                shopId={shopId}
                key={index}
                size={item}
                setSize={(a: Partial<choosenSize>) => {
                    let sizes = [...selectedSize];
                    sizes[index] = { ...sizes[index], ...a };
                    setSelectedSize(sizes);
                }}
                createSize={(data: Partial<choosenSize>) => {
                    createSize(data, index);
                }}
                removeSize={() => {
                    deleteSize(item, index);
                }}
                updateSize={() => {
                    return updateSize(item, index);
                }}
            />
        </ModalHOC>
    );
};

export default SizeUpdatePopup;
