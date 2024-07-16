import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

if (module.hot) {
  module.hot.accept();
}
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
    // 2. load search result
    await model.loadSearchResults(query);
    // 3.render result

    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    //4. render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
