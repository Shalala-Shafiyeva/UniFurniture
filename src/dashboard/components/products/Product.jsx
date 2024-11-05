import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function Product() {
  const [productData, setProductData] = useState({
    name: "",
    full_title: "",
    text: "",
    description: "",
    image: null,
    video: null,
    stock: "",
    hasStock: false,
    garranty: "",
    discount: 0,
    shipping: "",
    price: "",
    type_id: "",
    category_id: "",
    // colors: [],
    // colorImgs: [],
    // characteristics: [],
  });

  const [characteristics, setCharacteristics] = useState([]);
  const [colors, setColors] = useState([{ colorName: "", images: [""] }]);
  const [fetchCategory, setFetchCategory] = useState([]);
  const [fetchType, setFetchType] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleProductChange = (e) => {
    const { name, type, checked, files } = e.target;
    setProductData({
      ...productData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : e.target.value,
    });
  };

  const handleCharacteristicChange = (index, value) => {
    const updatedCharacteristics = [...characteristics];
    updatedCharacteristics[index] = value;
    setCharacteristics(updatedCharacteristics);
  };

  const handleAddCharacteristic = () =>
    setCharacteristics([...characteristics, ""]);

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = value;
    setColors(updatedColors);
  };

  const handleAddColor = () =>
    setColors([...colors, { colorName: "", images: [""] }]);

  const handleImageChange = (colorIndex, imageIndex, value) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images[imageIndex] = value;
    setColors(updatedColors);
  };

  const handleAddImage = (colorIndex) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images.push("");
    setColors(updatedColors);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setFetchCategory(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/type", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setFetchType(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (key === "hasStock") {
          formData.append(key, value ? 1 : 0);
        } else if (key === "discount") {
          formData.append(key, value || 0);
        } else {
          formData.append(key, value);
        }
      });

      formData.append("characteristics", JSON.stringify(characteristics));

      colors.forEach((color, colorIndex) => {
        formData.append(`colors[${colorIndex}][colorName]`, color.colorName);

        color.images.forEach((image, imageIndex) => {
          if (image instanceof File) {
            formData.append(
              `colors[${colorIndex}][images][${imageIndex}]`,
              image
            );
          }
        });
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch("http://localhost:8000/api/product/store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const product = await response.json();

      if (response.status === 422) {
        setErrors(product.errors || {});
      } else if (product.success) {
        setErrors({});
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row p-4 d-flex justify-content-center">
              <div className="col-6">
                <form
                  onSubmit={handleSubmit}
                  className="form d-flex flex-column gap-3 border p-3"
                  method="POST"
                >
                  <h3>Create Product</h3>

                  <div className="form-group gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={productData.name}
                      onChange={handleProductChange}
                      placeholder="Product Name"
                      className="form-control"
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group gap-2">
                    <label htmlFor="title">Full Title</label>
                    <input
                      type="text"
                      id="title"
                      name="full_title"
                      value={productData.full_title}
                      onChange={handleProductChange}
                      placeholder="Product Full Title"
                      className="form-control"
                    />
                    {errors.full_title && (
                      <div className="text-danger">{errors.full_title}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea
                      id="text"
                      name="text"
                      value={productData.text}
                      onChange={handleProductChange}
                      placeholder="Text"
                      className="form-control"
                    />
                    {errors.text && (
                      <div className="text-danger">{errors.text}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={productData.description}
                      onChange={handleProductChange}
                      placeholder="Description"
                      className="form-control"
                    />
                    {errors.description && (
                      <div className="text-danger">{errors.description}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleProductChange}
                      className="form-control"
                    />
                    {errors.image && (
                      <div className="text-danger">{errors.image}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="video">Video</label>
                    <input
                      type="file"
                      name="video"
                      id="video"
                      onChange={handleProductChange}
                      className="form-control"
                    />
                    {errors.video && (
                      <div className="text-danger">{errors.video}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={productData.price}
                      onChange={handleProductChange}
                      placeholder="Price"
                      className="form-control"
                    />
                    {errors.price && (
                      <div className="text-danger">{errors.price}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      value={productData.stock}
                      onChange={handleProductChange}
                      placeholder="Stock"
                      className="form-control"
                      min="0"
                    />
                    {errors.stock && (
                      <div className="text-danger">{errors.stock}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="hasStock">Has Stock</label>
                    <input
                      type="checkbox"
                      name="hasStock"
                      id="hasStock"
                      checked={productData.hasStock}
                      onChange={handleProductChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="garranty">Garranty</label>
                    <input
                      type="number"
                      name="garranty"
                      id="garranty"
                      value={productData.garranty}
                      onChange={handleProductChange}
                      placeholder="Garranty"
                      className="form-control"
                      min="0"
                      max="100"
                    />
                    {errors.garranty && (
                      <div className="text-danger">{errors.garranty}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <input
                      type="number"
                      name="discount"
                      id="discount"
                      value={productData.discount}
                      onChange={handleProductChange}
                      placeholder="Discount"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="shipping">Shipping</label>
                    <input
                      type="number"
                      name="shipping"
                      id="shipping"
                      value={productData.shipping}
                      onChange={handleProductChange}
                      placeholder="Shipping"
                      className="form-control"
                    />
                    {errors.shipping && (
                      <div className="text-danger">{errors.shipping}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category_id"
                      id="category"
                      className="form-control"
                      value={productData.category_id}
                      onChange={handleProductChange}
                    >
                      <option value="">Select Category</option>
                      {fetchCategory?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <div className="text-danger">{errors.category_id}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                      name="type_id"
                      id="type"
                      className="form-control"
                      value={productData.type_id}
                      onChange={handleProductChange}
                    >
                      <option value="">Select Type</option>
                      {fetchType?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errors.type_id && (
                      <div className="text-danger">{errors.type_id}</div>
                    )}
                  </div>

                  <h4>Characteristics</h4>
                  {characteristics.map((char, index) => (
                    <div key={index}>
                      <input
                        value={char}
                        onChange={(e) =>
                          handleCharacteristicChange(index, e.target.value)
                        }
                        placeholder="Characteristic"
                        className="form-control"
                        type="text"
                        name='characteristic'
                        id="characteristics"
                        required
                      />
                      {/* {errors[`characteristics.${index}.characteristic`] && (
                        <small className="text-danger">
                          {errors[`characteristics.${index}.characteristic`]}
                        </small>
                      )} */}
                    </div>
                  ))}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddCharacteristic}
                  >
                    Add Characteristic
                  </button>

                  <h4>Colors and Images</h4>
                  {colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="color-section">
                      <input
                        value={color.colorName}
                        onChange={(e) =>
                          handleColorChange(
                            colorIndex,
                            "colorName",
                            e.target.value
                          )
                        }
                        placeholder="Color Name"
                        className="form-control"
                        required
                      />
                      {/* {errors[`colors.${colorIndex}.colorName`] && (
                        <small className="text-danger">
                          {errors[`colors.${colorIndex}.colorName`]}
                        </small>
                      )} */}
                      {color.images.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="d-flex align-items-center mt-2"
                        >
                          <input
                            type="file"
                            onChange={(e) =>
                              handleImageChange(
                                colorIndex,
                                imgIndex,
                                e.target.files[0]
                              )
                            }
                            className="form-control"
                            required
                          />
                          {/* {errors[
                            `colors.${colorIndex}.images.${imgIndex}`
                          ] && (
                            <small className="text-danger">
                              {
                                errors[
                                  `colors.${colorIndex}.images.${imgIndex}`
                                ]
                              }
                            </small>
                          )} */}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddImage(colorIndex)}
                        className="btn btn-primary mt-2"
                      >
                        Add Image
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleAddColor}
                  >
                    Add Color
                  </button>
                  <button className="btn btn-warning mt-4" type="submit">
                    Create Product
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Product;
