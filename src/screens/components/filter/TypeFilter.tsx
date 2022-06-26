import {FontFamilies} from '@app/constants'
import {Cross2} from '@app/constants/icons/png'
import {SvgIconList} from '@app/constants/icons/svg'
import HandleSvg from '@app/constants/icons/svg/HandleSvg'
import {TransactionIconList} from '@app/constants/icons/svg/TransactionIcon'
import {
    BC,
    BGCOLOR,
    BR,
    BW,
    FDR,
    fs12,
    fs14,
    JCC,
    MH,
    ML,
    MR,
    MV,
    PH,
    PV
} from '@app/constants/style/common'

import {WrappedText} from '@app/screens/components'
import * as React from 'react'
import {View, StyleSheet, Image, ViewStyle} from 'react-native'
import Ripple from 'react-native-material-ripple'

interface IFilter {
    name: string
    icon?: string
    type?: 'svg' | 'png'
}

interface TypeFilterProps {
    filterList: IFilter[]
    selectedFilterIndex: number[]
    containerStyle?: ViewStyle[] | ViewStyle
    changeFilter: Function
}

export const Filter = ({
    selected,
    filter,
    onPress
}: {
    selected: boolean
    filter: IFilter
    onPress: Function
}) => {
    const textColor = selected ? '#9E30B6' : '#333333'
    const backgroundColor = selected ? '#EEE6F0' : '#F4F4F4'
    const borderColor = selected ? '#9E30B6' : 'rgba(0, 0, 0, 0.1)'
    return (
        <Ripple
            onPress={() => {
                if (onPress) {
                    onPress()
                }
            }}
            rippleContainerBorderRadius={300}
            style={[
                BW(1),
                BC(borderColor),
                BGCOLOR(backgroundColor),
                {paddingVertical: 8, borderRadius: 200},
                PH(0.4),
                MV(0.1),
                ML(0.1),

                FDR(),
                {overflow: 'hidden'}
            ]}>
            {filter.icon && filter.type === 'svg' ? (
                HandleSvg(
                    {},
                    '#000000',
                    SvgIconList[filter.name] || TransactionIconList.Shopping,
                    '20',
                    '20'
                )
            ) : (
                <Image source={filter.icon} style={{}} />
            )}
            <WrappedText
                text={filter.name.toLowerCase()}
                textColor={textColor}
                fontSize={fs14}
                fontFamily={FontFamilies.IBMPSB}
                containerStyle={{marginTop: 0, marginLeft: filter.icon ? 5 : 0}}
            />
            {selected && (
                <View
                    style={[
                        BGCOLOR('#FFFFFF'),
                        BR(3),
                        {
                            marginLeft: 5,
                            height: 18,
                            width: 18,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }
                    ]}>
                    <Image source={Cross2} style={{height: 10, width: 10, tintColor: '#9E30B6'}} />
                </View>
            )}
        </Ripple>
    )
}

const TypeFilter: React.FunctionComponent<TypeFilterProps> = ({
    filterList,
    selectedFilterIndex,
    changeFilter,
    containerStyle
}) => {
    const renderFilterList = React.useMemo(
        () =>
            filterList.map((item, index) => (
                <>
                    <Filter
                        selected={selectedFilterIndex.indexOf(index) > -1}
                        filter={item}
                        onPress={() => {
                            changeFilter(index)
                        }}
                    />
                </>
            )),
        [filterList, selectedFilterIndex, changeFilter]
    )

    return <View style={[styles.filterContainerWrap, containerStyle]}>{renderFilterList}</View>
}

const styles = StyleSheet.create({
    filterContainerWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
export default TypeFilter
