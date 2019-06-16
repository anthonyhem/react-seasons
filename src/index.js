// App component to grab user data and communicate to child components

import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {

	state = {lat: null, errMsg: ''};

	componentDidMount(){
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({lat:position.coords.latitude}),
			(err) => this.setState({errMsg: err.message})
		);
	}

	componentDidUpdate(){
		console.log('My component was just updated - it rerendered!');
	}

	renderContent () {
		if(this.state.errMsg && !this.state.lat) {
			return <div>Error: {this.state.errMsg}</div>
		}
		if(!this.state.errMsg && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />
		}
		return <Spinner message='Please accept location request...' />
	}
	//we have to define render
	render() {
		return(
			<div className="border red">
				{this.renderContent()}
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
);