import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    componentWillMount() {
        //API calls here
    }

    render() { 
        return(
            <div className="container">
                Home page. 
            </div>
        )
    }
}

export default Home;