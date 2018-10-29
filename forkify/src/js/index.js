import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, renderLoader, removeLoader } from "./views/base";
import Likes from "./models/Likes";

/** Global state of the app
 * -  Search object
 * -  Current recipe object
 * -  Shopping list object
 * -  Linked recipes
 */
const state = {};
window.state = state;

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
      console.log(ex);
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
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());


const controlRecipe = async () => {
  //  GET id from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    //  Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    
    //  Highlight selected recipe
    if (state.search) searchView.highlightSelected(id);

    //  Create new recipe object
    state.recipe = new Recipe(id);

    try {
      //  Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      console.log("Recipes are getted");
      state.recipe.parseIngredients();

      //  Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //  Render recipe
      removeLoader(elements.recipe);
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      );
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

/**
 * LIST CONTROLLER
 */
const controlList = () => {
  //  Create a new list IF there is none yet
  if (!state.list) state.list = new List();

  //  Add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    console.log(el);
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

/**
 * LIKE CONTROLLER
 */
//  Testing
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  //  User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    //  Add like to the data
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    //  Toggle the like button
    likesView.toggleLikeBtn(true);

    //  Add like to UI list
    likesView.renderLike(newLike);

    //  Add like to the UI list
    console.log(state.likes);

  //  User has liked current recipe
  } else {
    //  Remove like from the state
    state.likes.deleteLike(currentID);

    //  Toggle the like button
    likesView.toggleLikeBtn(false);

    likesView.deleteLike(currentID);
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//  Handle delete and updaate item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  //  Handle the delete button event
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    //  Delete from state
    state.list.deleteItem(id);

    //  Delete from the ui
    listView.deleteItem(id);


  } else if (e.target.matches('.shopping__count--value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

//  Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    screen.likes.likes.forEach(like => likesView.renderLike(like));
});

//  Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    //  Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    //  Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    //  Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    //  Like controller
    controlLike();
  }
});

window.l = new List();

