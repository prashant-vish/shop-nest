import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Cart from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Home />
            </ProtectedAdmin>
          }
        ></Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Protected>
              <ProductDetailPage />
            </Protected>
          }
        />
        <Route
          path="/admin/product-detail/:id"
          element={
            <ProtectedAdmin>
              <AdminProductDetailPage />
            </ProtectedAdmin>
          }
        />
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<UserOrdersPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
