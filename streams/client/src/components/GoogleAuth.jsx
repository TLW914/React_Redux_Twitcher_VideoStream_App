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

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null){
            return null;
        } else if (this.state.isSignedIn){
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
            <button onClick={this.onSignIn} className="ui red google button">
                <i className="google icon" />
                Sign in with Google
            </button>
            );
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
