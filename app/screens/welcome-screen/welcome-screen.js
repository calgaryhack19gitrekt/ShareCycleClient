import React from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Button } from 'react-native'

import { Api } from '../../services/api'
import { save } from '../../utils/storage'

class WelcomeScreen extends React.Component {

    state = {
        fname: "",
        lname: "",
        email: "",
        pnum: 0,
    }

    componentDidMount() {
        this.api = new Api()
        this.api.setup()
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} accessible={false}>
                <View style={styles.rootContainer}>
                    <KeyboardAvoidingView style={styles.textContainer} behavior={"position"} enabled>
                        <Text style={styles.welcomeText}>
                            Welcome to ShareCycle!
                        </Text>
                        <View style={styles.getStartedText}>
                            <Text style={styles.getStartedText1}>
                                Let's get started!
                            </Text>
                            <Text style={styles.getStartedText2}>
                                Fill out the information below
                            </Text>
                        </View>
                        <View styles={styles.fieldsContainer}>
                            <TextInput onChangeText={(changedText) => { this.setState({ fname: changedText }) }} style={styles.field} placeholder="First Name" />
                            <TextInput onChangeText={(changedText) => { this.setState({ lname: changedText }) }} style={styles.field} placeholder="Last Name" />
                            <TextInput onChangeText={(changedText) => { this.setState({ pnum: changedText }) }} style={styles.field} keyboardType="phone-pad" placeholder="Phone Number" />
                            <TextInput onChangeText={(changedText) => { this.setState({ email: changedText }) }} style={styles.field} keyboardType="email-address" placeholder="Email Address" />
                        </View>
                        <View style={{ marginLeft: -30, marginTop: 30 }}>
                            <Button color={"#2A7028"} onPress={() => {
                                this.api.createUser(this.state.fname, this.state.lname, this.state.email, this.state.pnum).then((result) => { result.kind === 'ok' ? this.doSuccess(result.user) : alert("Seems like something is wrong :/") })
                            }} title="Let's Go!" />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback >
        );
    }

    async doSuccess(user) {
        await save("user_id", user.id)
        await save("firstName", user.firstName)
        await save("lastName", user.lastName)
        await save("phoneNum", user.phoneNum)
        await save("email", user.email)
        this.props.navigation.navigate("app")
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: "#6CB76A",
        flex: 1,
        paddingLeft: 30,
    },
    textContainer: {
        top: 286
    },
    welcomeText: {
        color: "#2A7028",
        fontSize: 24,
    },
    getStartedText: {
        marginTop: 10,
        fontSize: 18,
    },
    getStartedText1: {
        color: "#2A7028"
    },
    getStartedText1: {
        color: "#114F10"
    },
    fieldsContainer: {
        marginTop: 51,
        flexDirection: 'column',
    },
    field: {
        marginTop: 15,
        color: "white"
    }
})

export default WelcomeScreen;