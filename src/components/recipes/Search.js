import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
	state = {
		text: ""
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		setAlert: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired
	};

	onChange = e => {
		this.setState({
			//usando e.target.name puedo tener varios input field y usar el mismo onChange para todos
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		//evitar error 422 si submit está vacío:
		if(this.state.text === '') {
			this.props.setAlert('Input some text!', 'light')
		} else {
		//pasar el valor hacia arriba por props:
		this.props.searchUsers(this.state.text);
		this.setState({
			text: ""
		});}
	};

	render() {
		const {showClear, clearUsers} = this.props
		return (
			<div>
				<form onSubmit={this.onSubmit} className="form">
					<input
						type="text"
						name="text"
						placeholder="search users"
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type="submit"
						value="Search"
						className="btn btn-dark btn-block"
					/>
				</form>
				{showClear && ( //mostrar boton solo si hay usuarios
					<button
						className="btn btn-light btn-block"
						onClick={clearUsers}
					>
						Clear all
					</button>
				)}
			</div>
		);
	}
}

export default Search;
