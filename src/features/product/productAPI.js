export function fetchAllProducts() {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function createProduct(product) {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // Todo: ON server it will only return some info of user (not password)
    resolve({ data });
  });
}

async function fetchTotalItems() {
  const response = await fetch("http://localhost:8080/products?");
  const data = await response.json();
  const totalItems = data.length;
  return +totalItems;
}

export function fetchAllProductsByFilters(filter, sort, pagination) {
  //filter={"category":["smartphone", "laptops"]}
  //sort ={_sort:"price",_order:"desc"}

  // Pagination page={_page:1,_limit:10}
  //Todo: on server we will support multiple values in filters
  // todo: on server we will filter all the deleted products
  

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    // This was not working here so i used fetchTotalItems function to implement the same

    // Todo: Fix this issue in order to get total items in cases of sorting to so that is show actual number not all 100.
    // const totalItems = await response.headers.get("X-Total-Count");
    const totalItems = await fetchTotalItems();
    resolve({ data: { products: data.data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
