import React from 'react';
import CLIENT_ID from './GoogleOAuthClientId.jsx';

class GoogleAuth extends React.Component { 
    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            window.gapi.client.init(
                {
                    clientId: CLIENT_ID,
                    scope: 'email'
                }
            )
        });
    }

    render() {
        return (
            <div>
                Google Auth
            </div>
        );
    }
}

export default GoogleAuth;
