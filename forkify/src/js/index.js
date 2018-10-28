import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, removeLoader } from "./views/base";

/** Global state of the app
 * -  Search object
 * -  Current recipe object
 * -  Shopping list object
 * -  Linked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  //  1) Get query from view
  const query = searchView.getInput(); //  TODO

  console.log(query);

  if (query) {
    //  2. New search object and add to state
    state.search = new Search(query);

    //  3. Prepare UI for results
    searchView.clearResults();

    //  4. Clear input field
    searchView.clearInput();

    //  5. Render loader
    renderLoader(elements.searchResult);

    try {
      //  6. Search for recipes
      await state.search.getResults();

      //  7. Remove loader
      removeLoader(elements.searchResult);

      //  8. Render results on UI
      searchView.renderResults(state.search.result);
    } catch (ex) {
      alert("Something wrong with the search...");
      removeLoader(elements.searchResult);
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  //  GET id from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    //  Prepare UI for changes

    //  Create new recipe object
    state.recipe = new Recipe(id);

    try {
      //  Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //  Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //  Render recipe
      console.log(state.recipe);
    } catch (ex) {
      alert("Error processing recipe!");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("onload", controlRecipe);
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
