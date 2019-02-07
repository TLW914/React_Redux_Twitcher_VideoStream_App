import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate.jsx';
import StreamEdit from './streams/StreamEdit.jsx';
import StreamDelete from './streams/StreamDelete.jsx';
import StreamList from './streams/StreamList.jsx';
import StreamShow from './streams/StreamShow.jsx';
import Header from './Header.jsx'

const App = () => {
    return (
        <div className="ui container">
            <Header />
            <BrowserRouter>
                <div>
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit" exact component={StreamEdit} />
                <Route path="/streams/delete" exact component={StreamDelete} />
                <Route path="/streams/show" exact component={StreamShow} />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;