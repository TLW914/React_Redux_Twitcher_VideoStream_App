import React from 'react';
import CLIENT_ID from '../GoogleClientIDs/GoogleOAuthClientId.jsx';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index.js';

class GoogleAuth extends React.Component { 

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
            // updates auth state in redux store
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
            <button onClick={this.onSignInClick} className="ui red google button">
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

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn: signIn, signOut: signOut }) (GoogleAuth);
