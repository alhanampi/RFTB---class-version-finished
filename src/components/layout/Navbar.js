import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const Navbar = props => {
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className="fa fa-hamburger p-1"></i>
				{props.title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

//si esto fuera con class, iría adentro de la class y en vez del nombre de la función sería static
// si no llegan props:
Navbar.defaultProps = {
	title: "revisar parent",
	icon: "fa fa-pencil"
};

//chequear types:
Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired
};

export default Navbar;
