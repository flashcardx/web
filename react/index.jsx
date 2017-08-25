import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/discover" render={() => <p>Discover</p>}/>
            <Route path="/feed" render={() =><p>Feed</p>}/>
            <Route path="/classes" render={() =><p>Classes</p>}/>
            <Route path="/practice" render={() =><p>Practie</p>}/>
            <Route path="/settings" render={() =><p>Settings</p>}/>
            <Route path="/" render={() => <p>My collection</p>}/>
            <Redirect from='*' to='/'/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('react'));