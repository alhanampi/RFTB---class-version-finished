import React from "react";
import PropTypes from 'prop-types'

const RecipeItem = ({recipe: {image, label, source}}) => {
	return (
		<>
			<div className="card text-center">
				<img
					src={image}
					className="round-img"
					style={{ width: "50px" }}
					alt="avatar"
				/>
				<h3>{label}</h3>
				<a href={source} className="btn-dark btn-sm my-1">
					More
				</a>
			</div>
		</>
	);
};

RecipeItem.prototypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
}

export default RecipeItem;
