import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, removeLoader } from './views/base';

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
  const query = searchView.getInput();  //  TODO
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

    //  6. Search for recipes
    await state.search.getResults();

    //  7. Remove loader
    removeLoader(elements.searchResult);

    //  8. Render results on UI
    searchView.renderResults(state.search.result);

    //  9. Render buttons
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});



/**
 * RECIPE CONTROLLER
 */
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
