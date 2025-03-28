export function fetchAllProducts() {
  // Todo: We will not hard-code server-url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
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
