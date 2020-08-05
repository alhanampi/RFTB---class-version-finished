import React from "react";

const Alert = ({ alert }) => {
	return (
		//primero hay que chequear que el alert no sea nulo, y la clase se va a pasar de forma dinámica. Type va a venir por props:
		alert !== null && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fa fa-info-circle"></i> {alert.message}
			</div>
		)
	);
};

export default Alert;
