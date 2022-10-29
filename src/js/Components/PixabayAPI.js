import axios from 'axios';

class PixabayAPI {
  static #BASE_URL = 'https://pixabay.com/api/';
  static #REQUEST_OPTIONS = {
    API_KEY: '30935099-a7fcd6d10ec6dd09de8c82d9d',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    PER_PAGE: '12',
    SAFESEARCH: 'true',
    page: null,
    searchQuery: '',
  };
  static #totalPages = null;

  static ifMoreImagesPossible = false;

  static async getImages(searchedImages = this.#REQUEST_OPTIONS.searchQuery) {
    const search = this.#REQUEST_OPTIONS.searchQuery;

    if (searchedImages === search) this.#incrementRequestPage();

    if (searchedImages !== search) this.#resetRequestPage();

    this.#REQUEST_OPTIONS.searchQuery = searchedImages;
    const {
      API_KEY,
      IMAGE_TYPE,
      ORIENTATION,
      PER_PAGE,
      SAFESEARCH,
      page,
      searchQuery,
    } = this.#REQUEST_OPTIONS;

    const result = await axios.get(this.#BASE_URL, {
      params: {
        key: API_KEY,
        image_type: IMAGE_TYPE,
        orientation: ORIENTATION,
        per_page: PER_PAGE,
        safesearch: SAFESEARCH,
        page: page,
        q: searchQuery,
      },
    });

    if (result.status === 200) {
      this.#setTotalPages(result.data.totalHits);
      this.#setIfMoreImagesPossible();

      return result.data.hits;
    }

    if (result.status !== 200) throw Error('Something went wrong...');
  }

  static #incrementRequestPage() {
    this.#REQUEST_OPTIONS.page += 1;
  }

  static #resetRequestPage() {
    this.#REQUEST_OPTIONS.page = 1;
  }

  static #setTotalPages(hits) {
    this.#totalPages = Math.ceil(hits / this.#REQUEST_OPTIONS.PER_PAGE);
  }

  static #setIfMoreImagesPossible() {
    this.ifMoreImagesPossible =
      this.#REQUEST_OPTIONS.page <= this.#totalPages - 1;
  }
}

export default PixabayAPI;
