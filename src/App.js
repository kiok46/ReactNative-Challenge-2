import React, {Component} from 'react';
import {
    View,
    Animated,
    Text,
    StyleSheet,
    Switch,
    Dimensions
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
const EntypoIcon = Animated.createAnimatedComponent(Entypo)


class PaymentSync extends Component{

    state = {
        paymentEnabled: false,
        backupEnabled: false,
        paymentAnimation: new Animated.Value(0),
    }

    onPaymentValueChange = () => {
        const toValue = this.state.paymentEnabled ? 0 : 1;

        this.setState({ paymentEnabled: !this.state.paymentEnabled })

        Animated.timing(this.state.paymentAnimation, {
            toValue,
            duration: 300
        }).start()
    }

    renderPaymentCard = () => {
        const { width } = Dimensions.get("window")

        const paymentBubbleScaleInterpolate = this.state.paymentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 60]
        })

        const paymentTextInterpolate = this.state.paymentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['black', 'white']
        })

        const paymentTextColorStyle = {
            color: paymentTextInterpolate
        }

        const paymentBubbleTransformStyle = {
            transform: [
                {
                    scale: paymentBubbleScaleInterpolate
                }
            ]
        }

        return (
            <View style={[styles.card, {width: width, marginBottom: 1,}]}>
                <Animated.View style={[styles.bubbleStyle, paymentBubbleTransformStyle, {backgroundColor: 'rgb(36, 173, 251)'}]}/>
                <Animated.Text style={[styles.mainHeadingStyle, paymentTextColorStyle]}>Payment</Animated.Text>
                <Animated.Text style={[paymentTextColorStyle, styles.subHeadingStyle]}>Enable FingerPrint Payment. Make payments using the fingerprint sensor.</Animated.Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: "100%"}}>
                    <EntypoIcon name="fingerprint" size={42} color="black" style={[paymentTextColorStyle, {backgroundColor: 'transparent'}]}/>
                    <Switch
                        value={this.state.paymentEnabled}
                        onValueChange={this.onPaymentValueChange}
                        onTintColor="rgb(66, 203, 251)"
                        style={styles.switchStyle}
                    />
                </View>
            </View>
        )

    }

    render() {
        const { width } = Dimensions.get("window")

        return(
            <View style={{flex: 1}}>
                <View style={{zIndex: 10, height: '25%', width, backgroundColor: 'rgb(240, 240, 240)' }}/>
                {this.renderPaymentCard()}
                <View style={{zIndex: 10, height: '25%', width, backgroundColor: 'rgb(240, 240, 240)' }}/>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({

    defaultHeading: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainHeadingStyle: {
        fontSize: 28,
        backgroundColor: 'transparent'
    },
    bubbleStyle: {
        width: 15,
        height: 15,
        backgroundColor: 'rgb(252, 100, 77)',
        borderRadius: 10,
        position: 'absolute',
        right: 100,
        bottom: 60
    },
    subHeadingStyle: {
        textAlign: 'center',
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    card: {
        height: "50%",
        width: "80%",
        backgroundColor: 'white',
        shadowOpacity: .4,
        shadowOffset: {x: 0, y: 2},
        shadowColor: 'black',
        shadowRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default PaymentSync;