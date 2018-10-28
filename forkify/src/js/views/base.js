export const elements = {
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".search"),
  searchResultList: document.querySelector(".results__list"),
  searchResult: document.querySelector(".results"),
  searchResultPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe")
};

export const renderLoader = parent => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const removeLoader = parent => {
  parent.children[0].remove();
};
