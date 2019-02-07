import React from 'react';
import CLIENT_ID from '../GoogleClientIDs/GoogleOAuthClientId.jsx';

class GoogleAuth extends React.Component { 

    state = { 
        isSignedIn: null
    }

    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            window.gapi.client.init(
                {
                    clientId: CLIENT_ID,
                    scope: 'email'
                }
            ).then(() => {
            // saves reference to auth object on component class
            this.auth = window.gapi.auth2.getAuthInstance();
            //update componenet level state
            this.setState({ isSignedIn: this.auth.isSignedIn.get() });
            this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState( {isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null){
            return <div>dunno if signed in</div>
        } else if (this.state.isSignedIn){
            return <div>signed in</div>
        } else {
            return <div>i am not signed in</div>
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

export default GoogleAuth;
