export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}
export function  updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}

async function fetchTotalOrders() {
  const response = await fetch("http://localhost:8080/orders?");
  const data = await response.json();
  const totalItems = data.length;
  return +totalItems;
}

export function fetchAllOrders(pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    // This was not working here so i used fetchTotalItems function to implement the same

    // Todo: Fix this issue in order to get total items in cases of sorting to so that is show actual number not all 100.
    // const totalItems = await response.headers.get("X-Total-Count");
    const totalOrders = await fetchTotalOrders();
    resolve({ data: { orders: data.data, totalOrders: +totalOrders } });
  });
}
