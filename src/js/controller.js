import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
// import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';
// import paginationView from './views/paginationView.js';
// console.log(icons);
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // 1. loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;
    // 2. Rendering the recipe
    recipeView.render(model.state.recipe);
    // const recipeView=new recipeView(model.state.recipe)
  } catch (err) {
    alert(err);
  }
};

console.log("TESAT");
// controlRecipes();

// ['hashchange','load'].forEach(ev=> window.addEventListener(ev,controlRecipes))

window.addEventListener("hashchange", controlRecipes);
window.addEventListener("load", controlRecipes);
