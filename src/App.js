import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


import {Input, Text, PhoneNumberInput, Button} from "@anarock/pebble";

class App extends Component {
    state = {
        merchantStoreName: null,
        storeId: null,
        phoneNo: 8511216570,
        amount: null,
        showOtp: false
    };

    verify = () => {
        const {phoneNo} = this.state;
        const headers = {
            "merchantId": "A28RUGPVUTQXU1",
            "Content-Type": "application/json"
        };
        const body = {
            "signatureMethod": "HmacSHA384",
            "signatureVersion": "4",
            "accessKeyId": "69eddc10-17a8-414b-94f8-6a7602690266",
            "merchantId": "A28RUGPVUTQXU1",
            "timeStamp": "1551772277067",
            "merchantReturnToUrl": "http://ec2-35-162-20-220.us-west-2.compute.amazonaws.com/beta/verifySignatureDebug.jsp",
            "merchantTransactionId": "vikrampa-test-oro-R1",
            "lookAheadToken": "bc740647-18f6-4978-bb3e-a05cf13b5fae",
            "customerIdValue": "A2YT4W16WO1ND1",
            "customerIdType": "CUSTOMER_ID",
            "merchantNote": phoneNo,
            "amount": "2",
            "currencyCode": "INR"
        };
        console.log("I was called");
        fetch("https://kuber-dwaar-tcp.integ.amazon.com/devhepler/signAndEncrypt", {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(r => this.setState({showOtp: true})).catch(_ => console.log("rej"))
    };

    render() {
        const {merchantStoreName, storeId, phoneNo, amount, showOtp} = this.state;
        return (
            <div className="App">
                <div className="Container">
                    <Text style={{flexDirection: "row", justifyContent: "center"}}>Merchant Information</Text>
                    <Input
                        onChange={r => this.setState({merchantStoreName: r})}
                        placeholder={"Store Name"}
                        value={merchantStoreName}
                    />
                    <Input
                        onChange={r => this.setState({storeId: r})}
                        placeholder={"Store Id"}
                        value={storeId}
                    />
                </div>
                {!showOtp &&<div className="Container">
                    <Text style={{flexDirection: "row", justifyContent: "center"}}>Customer Information</Text>
                    <PhoneNumberInput
                        onChange={arg => {
                            const {countryCode, phone} = arg;
                            this.setState({
                                countryCode: `${countryCode}`,
                                phoneNo: phone
                            });
                        }}
                        phone={phoneNo}
                        countryCode={"+91"}
                        onCountrySelect={() => {
                        }}
                    />
                    <Input
                        value={amount}
                        onChange={amount => this.setState({amount})}
                        placeholder={"Enter Amount"}
                    />
                    <Button onClick={() => this.verify()}>Verify Customer</Button>
                </div>
                }
                {showOtp && <div className="Container">
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Input
                            placeholder="Enter OTP"
                            style={{paddingRight: `5%`}}
                        />
                        <Button onClick={() => this.sendOtp()}>Send Otp</Button>
                    </div>
                </div>}
            </div>
        );
    }
}

export default App;
