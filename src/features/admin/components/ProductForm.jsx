import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue(
        "image1",
        selectedProduct.images[0] ?? selectedProduct.thumbnail
      );
      setValue(
        "image2",
        selectedProduct.images[1] ?? selectedProduct.thumbnail
      );
      setValue(
        "image3",
        selectedProduct.images[2] ?? selectedProduct.thumbnail
      );
      setValue(
        "image4",
        selectedProduct.images[3] ?? selectedProduct.thumbnail
      );
    }
  }, [selectedProduct, setValue, params.id]);
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];
        delete product["image4"];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        console.log(product);
        if (params.id) {
          product.id = params.id;
          product.rating = +selectedProduct.rating || 0;
          dispatch(updateProductAsync(product));
        } else {
          dispatch(createProductAsync(product));
        }
      })}
    >
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Add Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="title"
                    {...register("title", {
                      required: "Name is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about your Product.
              </p>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="brand"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: "brand is required",
                  })}
                >
                  <option value={""}>--Choose Brand--</option>

                  {brands.map((brand) => (
                    <option value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: "category is required",
                  })}
                >
                  <option value={""}>--Choose Category--</option>

                  {categories.map((category) => (
                    <option value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="price"
                    {...register("price", {
                      required: "price is required",
                      min: 1,
                      max: 10000,
                    })}
                    type="number"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="discountPercentage"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min: 0,
                      max: 100,
                    })}
                    type="number"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="stock"
                    {...register("stock", {
                      required: "stock is required",
                      min: 1,
                    })}
                    type="number"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image1"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image1
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="image1"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image2"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image2
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="image2"
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image3"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image3
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="image3"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label
                htmlFor="image4"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image4
              </label>
              <div className="mt-2">
                <div className="flex  items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="image4"
                    {...register("image4", {
                      required: "image4 is required",
                    })}
                    type="text"
                    className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Extra</h2>

          <div className="mt-10 space-y-10"></div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
