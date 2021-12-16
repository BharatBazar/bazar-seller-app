import * as React from 'react'
import {View, StyleSheet} from 'react-native'
import {WrappedRectangleButton, WrappedText} from '@app/screens/components'
// @ts-ignore
import {
    BGCOLOR,
    colorCode,
    FDR,
    fs25,
    getHP,
    globalWidth,
    JCC,
    PB,
    PH,
    PT,
    FLEX
} from '@app/constants/style/common'
import {FontFamilies} from '@app/constants'
import DatePicker from 'react-native-date-picker'
import ModalWithHeader from './ModalWithHeader'
import FooterSection from '@app/screens/app/utils/FooterSection'
import {useEffect} from 'hoist-non-react-statics/node_modules/@types/react'
import moment from 'moment'

interface DatePopupProps {
    isVisible: boolean
    setPopup: Function
    setDate: Function
    defaultDate: string
    heading: string
    minDate?: Date
    maxDate?: Date
}

const DatePopup: React.FunctionComponent<DatePopupProps> = ({
    isVisible,
    setPopup,
    defaultDate,
    setDate,
    heading,
    minDate,
    maxDate
}) => {
    const [dobPopup, setDobPopup] = React.useState('')

    React.useEffect(() => {
        if (isVisible && defaultDate) {
            setDobPopup(new Date(defaultDate))
        } else if (isVisible) {
            setDobPopup(new Date())
        }
    }, [defaultDate, isVisible])

    return (
        <ModalWithHeader
            isVisible={isVisible}
            setPopup={setPopup}
            headerStyle={{color: '#9e30b6'}}
            contentContainerStyle={styles.containerStyle}
            heading={heading}>
            <View style={[FLEX(1)]}>
                <View style={{}}>
                    <DatePicker
                        style={{width: globalWidth * 9, marginTop: '5%'}}
                        date={dobPopup || new Date()}
                        mode="date"
                        maximumDate={maxDate || new Date()}
                        onDateChange={dob => {
                            console.log(dob)
                            setDobPopup(dob)
                        }}
                        minimumDate={minDate || undefined}
                        textColor={'#9e30b6'}
                    />
                    <View style={[JCC('flex-end')]}>
                        <FooterSection
                            footerStyle={'twoEvenlySpaced'}
                            primaryButtonText={'apply'}
                            secondaryButtonText={'cancel'}
                            primaryButtonAction={() => {
                                //  checkError()
                                setDate(moment(dobPopup || new Date()).format('YYYY-MM-DD'))
                                setPopup(false)
                            }}
                            secondaryButtonAction={() => {
                                setPopup()
                            }}
                        />
                    </View>
                </View>
            </View>
        </ModalWithHeader>
    )
}

export default DatePopup

const styles = StyleSheet.create({
    containerStyle: {
        height: getHP(5.4),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    }
})
