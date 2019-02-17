import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { Api } from '../../services/api'
import { save, load } from '../../utils/storage'

class ProfileScreen extends React.Component {

    state = {
        user_id: "",
        fname: "",
        lname: "",
        email: "",
        num: 1234567890,
        current_bike: {},
    }

    componentDidMount() {
        this.api = new Api()
        this.api.setup()
        this.doRefresh()
    }

    async doRefresh() {
        this.setState({
            user_id: await load("user_id").then((value) => value),
            fname: await load("firstName").then((value) => value),
            lname: await load("lastName").then((value) => value),
            email: await load("email").then((value) => value),
            num: await load("phoneNum").then((value) => value),
            current_bike: await load("current_bike").then((value) => value),
        });
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.textContainer}>
                    <Text>USER_ID: {this.state.user_id}</Text>
                    <Text>Name: {this.state.fname} {this.state.lname}</Text>
                    <Text>Email Address: {this.state.email}</Text>
                    <Text>Phone Number: {this.state.num}</Text>
                    <Text>Current Bike:</Text>
                    {
                        this.state.current_bike.id ?
                            <View style={{ paddingLeft: 30, paddingTop: 15 }}>
                                <Text>BIKE_ID: {this.state.current_bike.id}</Text>
                                <Text>BIKE_LAT: {this.state.current_bike.latitude}</Text>
                                <Text>BIKE_LONG: {this.state.current_bike.longitude}</Text>
                                <View style={{ marginLeft: -60 }}>
                                    <Button title="Unregister" onPress={() => { this.doUnReserveBike() }} />
                                </View>
                            </View>
                            :
                            undefined
                    }
                </View>
            </View>
        );
    }

    async doUnReserveBike() {
        this.api.updateBike()
        navigator.geolocation.getCurrentPosition(async (success) => {
            loc = success
            this.api.updateBike(loc.coords.longitude, loc.coords.latitude, -1, true, this.state.current_bike.id).then(() => { save("current_bike", {}) })
            this.doRefresh()
        }, (error) => { alert(error.toString()) })
        alert("We've successfully locked the bike!")
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
})

export default ProfileScreen;