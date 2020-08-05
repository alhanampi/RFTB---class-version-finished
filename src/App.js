import React, { Component, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/recipes/Users";
import User from "./components/recipes/User";
// import Recipes from "./components/recipes/Recipes";
import Search from "./components/recipes/Search";
import Alert from "./components/layout/Alert";
import "./App.css";
import About from "./components/pages/About";

class App extends Component {
	state = {
		// recipes: [],
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	async componentDidMount() {
		this.setState({
			loading: true
		});

		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({
			users: res.data,
			loading: false
		});

		//edaman:
		// const APP_ID = "d55d66f4";
		// const APP_KEY = "589bf9b154fd175fe3b43becb8936363";
		// const query = "avocado";
		// const res = await axios.get(
		// 	`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
		// );

		// this.setState({
		// 	recipes: res.data,
		// 	loading: false
		// });
		// // console.log(res.data);
		// console.log(this.state.recipes)
	}

	//al ser arrow, se pone el async en el parametro:
	searchUsers = async text => {
		this.setState({
			loading: true
		});

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		//los user deben almacenarse en otro lugar al del primer query que se hace por un tema de pagination
		this.setState({
			users: res.data.items,
			loading: false
		});
	};

	//get un solo user:
	getUser = async username => {
		this.setState({
			loading: true
		});

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			user: res.data,
			loading: false
		});
	};

	//get de los repos:
	getRepos = async username => {
		this.setState({
			loading: true
		});

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			repos: res.data,
			loading: false
		});
	};

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false
		});
	};

	setAlert = (message, type) => {
		this.setState({
			alert: {
				message,
				type
			}
		});
		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	render() {
		const { users, loading, user, alert, repos } = this.state;

		return (
			<Router>
				<div className="App">
					{/* <Navbar title="Recipes App" />
				<div className="container">
					<Recipes loading={this.state.loading} recipes={this.state.recipes} />
				</div> */}
					<Navbar title="Github App" />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={props => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							{/* no puedo hacer component en este caso porque necesito pasar data. Uso el spread para pasar toda la data */}
							<Route
								exact
								path="/user/:login"
								render={props => (
									<User
										{...props}
										user={user}
										loading={loading}
										repos={repos}
										getUser={this.getUser}
										getRepos={this.getRepos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
