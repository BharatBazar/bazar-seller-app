import {FontFamilies} from '@app/constants'
import {Cross2} from '@app/constants/icons/png'
import {BC, BGCOLOR, BR, BW, FDR, FLEX, JCC, ML, MV, PH, PV} from '@app/constants/style/common'
import {WrappedText} from '@app/screens/components'
import moment from 'moment'
import * as React from 'react'
import {View, Image} from 'react-native'
import Ripple from 'react-native-material-ripple'
import DatePopup from '../popup/DatePopup'

export const ShowDate = ({
    selected,
    filter,
    onPress,
    onCross
}: {
    selected: boolean
    filter: {name: string}
    onPress: Function
    onCross: Function
}) => {
    const textColor = selected ? '#9E30B6' : '#333333'
    const backgroundColor = selected ? '#EEE6F0' : '#F4F4F4'
    const borderColor = selected ? '#9E30B6' : 'rgba(0, 0, 0, 0.1)'
    return (
        <View
            style={[
                BW(1),
                BC(borderColor),
                BGCOLOR(backgroundColor),
                {borderRadius: 200},
                PH(0.4),
                MV(0.1),
                ML(0.05),

                FDR(),
                {overflow: 'hidden'}
            ]}>
            <Ripple
                style={{paddingVertical: 8}}
                rippleContainerBorderRadius={300}
                onPress={() => {
                    if (onPress) {
                        onPress()
                    }
                }}>
                <WrappedText
                    text={filter.name}
                    textColor={textColor}
                    fontFamily={FontFamilies.IBMPSB}
                    containerStyle={{marginTop: 0}}
                />
            </Ripple>
            {selected && (
                <Ripple
                    onPress={() => {
                        onCross()
                    }}
                    rippleContainerBorderRadius={300}
                    style={[
                        BGCOLOR('#FFFFFF'),
                        BR(3),
                        {
                            marginLeft: 5,
                            height: 20,
                            width: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }
                    ]}>
                    <Image source={Cross2} style={{height: 10, width: 10, tintColor: '#9E30B6'}} />
                </Ripple>
            )}
        </View>
    )
}
interface DateFilterProps {
    startDate?: string
    endDate?: string
    setStartDate: Function
    setEndDate: Function
}

const DateFilter: React.FunctionComponent<DateFilterProps> = ({
    setEndDate,
    setStartDate,
    startDate,
    endDate
}) => {
    const [datePicker, setDatePicker] = React.useState(0)

    return (
        <View style={[FDR(), JCC('space-between'), PH(0.6), PV(0.3)]}>
            <ShowDate
                selected={startDate ? true : false}
                filter={{
                    name: startDate ? moment(startDate).format('DD MMM, YYYY') : 'set start date'
                }}
                onPress={() => {
                    setDatePicker(1)
                }}
                onCross={() => {
                    setStartDate(undefined)
                    //setEndDate(undefined)
                }}
            />

            <ShowDate
                selected={endDate ? true : false}
                filter={{name: endDate ? moment(endDate).format('DD MMM, YYYY') : 'set end date'}}
                onPress={() => {
                    setDatePicker(2)
                }}
                onCross={() => {
                    setEndDate(undefined)
                }}
            />
            <DatePopup
                isVisible={datePicker > 0 ? true : false}
                setPopup={() => {
                    setDatePicker(0)
                }}
                setDate={datePicker === 1 ? setStartDate : datePicker === 2 ? setEndDate : () => {}}
                defaultDate={
                    datePicker === 1
                        ? startDate || new Date()
                        : datePicker === 2
                        ? endDate || new Date()
                        : undefined
                }
                minDate={datePicker === 1 ? undefined : startDate ? new Date(startDate) : undefined}
                maxDate={datePicker === 2 ? undefined : endDate ? new Date(endDate) : undefined}
                heading={datePicker === 1 ? 'set start date' : 'set end date'}
            />
        </View>
    )
}

export default DateFilter
