import React, { Component } from 'react'
import RecipeItem from "./RecipeItem"

class Recipes extends Component {
  // state = {
  //   recipes: [
  //     {
  //       uri: "1",
  //       label: "Pescado",
  //       image: "https://img.icons8.com/color/2x/bento.png",
  //       source: "www.google.com",
  //     },
  //     {
  //       uri: "2",
  //       label: "Cupcake",
  //       image: "https://img.icons8.com/color/2x/kawaii-cupcake.png",
  //       source: "www.google.com",
  //     },
  //     {
  //       uri: "3",
  //       label: "Pan",
  //       image: "https://img.icons8.com/color/2x/bread.png",
  //       source: "www.google.com",
  //     }
  //   ]
  // }
  render() {
    return (
      <div style={userStyle}>
        {this.state.recipes.map(recipe => (
          <RecipeItem key={recipe.uri} recipe={recipe} />
        ))}
      </div>
    )
  }
}

//pasar estilos como
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Recipes
