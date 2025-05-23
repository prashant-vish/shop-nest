import { useEffect, useState } from "react";
import { discountedPrice, ITEM_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const totalOrders = useSelector(selectTotalOrders);

  const handlePage = (page) => {
    setPage(page);
    // const pagination = { _page: page, _per_page: ITEM_PER_PAGE };
    // dispatch(fetchAllOrdersAsync({ sort, pagination }));
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    // const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    // It should be this.
    const pagination = { _page: page, _per_page: ITEM_PER_PAGE };
    // const sort = {};
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  // This will work when in productsApi this will be made
  // const totalItems = await response.headers.get("X-Total-Count");

  const handleShow = () => {
    console.log("handleShow");
  };
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200  text-purple-600";
      case "dispatched":
        return "bg-yellow-200  text-yellow-600";
      case "delivered":
        return "bg-green-200  text-green-600";
      case "cancelled":
        return "bg-red-200  text-red-600";

      default:
        return "bg-purple-200  text-purple-600";
    }
  };
  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify- font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" && sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline-block" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline-block" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" && sort?._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline-block" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline-block" />
                    )}
                  </th>
                  <th className="py-3 px-6 text-center">Shipping Amount</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">#{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center mt-2">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>
                            {item.title} - #{item.quantity} - $
                            {discountedPrice(item)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>
                        </div>
                        <div>{order.selectedAddress.street}</div>
                        <div>{order.selectedAddress.city}</div>
                        <div>{order.selectedAddress.state}</div>
                        <div>{order.selectedAddress.pinCode}</div>
                        <div>{order.selectedAddress.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4=6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-6 h-6"
                            onClick={(e) => handleShow(order)}
                          />
                        </div>
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-6 h-6"
                            onClick={(e) => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
};

export default AdminOrders;
