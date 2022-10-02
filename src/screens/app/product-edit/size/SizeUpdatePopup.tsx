import { BGCOLOR, BTR, DSP, MT, P, PA, PH, PV } from '@app/common/styles';
import { MTA, MVA } from '@app/common/stylesheet';
import Loader from '@app/screens/component/Loader';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { APIDeleteProductSize, APIUpdateProductSize } from '@app/server/apis/product/product.api';
import { IRProductSize } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { choosenSize } from '../data-types';
import Size from './Size';

interface SizeUpdatePopupProps {
    isVisible: boolean;
    setPopup: Function;
    updateSize: Function;
    removeSize: Function;
    item: choosenSize;
    shopId: string;
    index: number;
}

const SizeUpdatePopup: React.FunctionComponent<SizeUpdatePopupProps> = ({
    isVisible,
    setPopup,
    updateSize,
    item,
    removeSize,
    shopId,
    index,
}) => {
    const [loader, setLoader] = React.useState(false);
    const [size, setSize] = React.useState<choosenSize>(item);

    const updateSizeInServer = async (data: Partial<choosenSize>) => {
        try {
            setLoader(true);
            let sizeData = {
                ...data,
            };
            console.log('size', sizeData);
            const id: IRProductSize = await APIUpdateProductSize(sizeData);
            setLoader(false);
            if (id && id.status == 1) {
                updateSize(sizeData);
                setPopup();
                return true;
            } else {
                throw new Error(id.message);
            }
        } catch (error) {
            setLoader(false);
            console.log('error=>', error);
            showMessage({ type: 'danger', message: error.message });
            // .errorAlert(error.message, 'Error in generating product id');
        }
    };

    const deleteSize = async (data: Partial<choosenSize>) => {
        if (data.itemId?.length > 0) {
            try {
                setLoader(true);
                const id: IRProductSize = await APIDeleteProductSize({ _id: data._id, parentId: data.parentId });
                setLoader(false);
                if (id && id.status == 1) {
                    ToastHOC.successAlert('Size deleted!');
                    removeSize();
                    setPopup();
                } else {
                    throw new Error(id.message);
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
                showMessage({ type: 'danger', message: error.message });
                // .errorAlert(error.message, 'Error in generating product id');
            }
        } else {
        }
    };

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={[BGCOLOR('#FFFFFF'), PA(DSP), BTR(20)]}>
                <HeaderWithTitleAndSubHeading heading="Update Size" />
                <View style={[MT(0.2)]} />
                <Size
                    setSize={(a) => {
                        setSize({ ...size, ...a });
                    }}
                    setLoader={setLoader}
                    shopId={shopId}
                    key={index}
                    size={size}
                    removeSize={() => {
                        deleteSize(size);
                    }}
                    updateSize={() => {
                        return updateSizeInServer(size);
                    }}
                />
                <Border />
                <RightComponentButtonWithLeftText
                    buttonText={'Close'}
                    containerStyle={[MTA()]}
                    onPress={() => {
                        //checkError();
                    }}
                />
            </View>
            {loader && <Loader />}
        </ModalHOC>
    );
};

export default SizeUpdatePopup;
