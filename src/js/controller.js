import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

const recipeContainer = document.querySelector(".recipe");

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
    recipeView.renderError(
      "No recipes found for your query. Please try again!"
    );
  }
};

const controlSearchResults = async function () {
  try {
    // 1 get search query
    const query = searchView.getQuery();
    if (!query) return;
    console.log('asdasdd')
    // 2. load search result
    await model.loadSearchResults(query);
    // 3.render result
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
};
init();
