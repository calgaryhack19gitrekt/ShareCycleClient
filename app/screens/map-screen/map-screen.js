import React from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Button, TouchableOpacity, Geolocation } from 'react-native'

import { load, save } from '../../utils/storage'

import { Api } from '../../services/api'

class MapScreen extends React.Component {

    state = {
        markers: []
    }

    componentDidMount() {
        console.tron.log(this.props)
        console.tron.log(navigator.storage)
        this.api = new Api()
        this.api.setup()
        this.refreshPage()
    }

    async refreshPage() {
        let current_bike = {}
        await load("current_bike").then((value) => { current_bike = value });
        this.api.getBikes().then((value) => { value.kind === 'ok' ? this.setState({ markers: value.bikes, current_bike: current_bike }) : alert("There was an error fetching the bikes") }, (reason) => { alert(reason.toString()) })
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }} accessible={false}>
                <View style={{ flex: 1 }}>
                    <MapView
                        // provider={PROVIDER_GOOGLE}
                        ref={(map) => { this._map = map }}
                        style={{ flex: 1 }}
                        onTouchEnd={(map) => { console.tron.log(this._map.getCamera()) }}
                        initialCamera={{
                            center: {
                                latitude: 51.0786313,
                                longitude: -114.1362028
                            },
                            pitch: 0,
                            heading: 0,
                            zoom: 14,
                            altitude: 7000
                        }}
                        showsUserLocation={true}
                    >
                        {this.state.markers.map((marker, index) => {
                            return this.state.current_bike && this.state.current_bike.id === marker.id ? undefined : (
                                <Marker
                                    image={require("./Vector.png")}
                                    key={marker.id}
                                    coordinate={{ longitude: marker.longitude, latitude: marker.latitude }}
                                    onCalloutPress={marker.available ? () => {
                                        let loc = null;
                                        navigator.geolocation.getCurrentPosition(async (success) => {
                                            loc = success
                                            this.api.updateBike(loc.coords.longitude, loc.coords.latitude, await load("user_id").then((value) => value, (reason) => { alert(reason.toString()) }), false, marker.id).then((result) => { save("current_bike", result.bike) })
                                            this.refreshPage()
                                        }, (error) => { alert(error.toString()) })
                                    } : undefined}
                                >
                                    <Callout>
                                        <TouchableOpacity>
                                            <Text>
                                                {`BIKE_ID: ${marker.id}`}
                                            </Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text>Status: </Text>
                                                <Text style={{ color: marker.available ? "#6CB76A" : "#B76A6A" }}>{marker.available === true ? "available".toUpperCase() : "unavailable".toUpperCase()}</Text>
                                            </View>
                                            {marker.available ? <Text>Click to reserve!</Text> : null}
                                        </TouchableOpacity>
                                    </Callout>
                                </Marker>
                            );
                        })}
                    </MapView>
                </View>
            </TouchableWithoutFeedback >
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: "white",
        flex: 1,
        paddingLeft: 30,
    }
})

export default MapScreen;