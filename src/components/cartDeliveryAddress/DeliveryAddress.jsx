import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress } from "../../slices/addressSlice";

function DeliveryAddress({ orderAddress, setOrderAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchedAddresses = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/address/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setAddresses(result.data);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  }, [addresses]);

  useEffect(() => {
    fetchedAddresses();
  }, []);

  useEffect(() => {
    if (defaultAddress) {
      setOrderAddress(defaultAddress);
    }
  }, [defaultAddress]);

  const handleCreateAddress = async (address) => {
    try {
      const response = await fetch("http://localhost:8000/api/address/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ address: address }),
      });
      const result = await response.json();
      if (response.status == 422) {
        setValidationErrors(result.errors || {});
      } else {
        setValidationErrors({});
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/address/delete/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  const handleEditAddress = async (id, address) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/address/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ address: address }),
        }
      );
      const result = await response.json();
      if (response.status == 422) {
        setValidationErrors(result.errors || {});
      } else {
        setValidationErrors({});
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  const handleDefaultAddress = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/address/default/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setDefaultAddress(result.data.address);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  const handleAddress = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/address/show/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setEditText(result.data.address || "");
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    } finally {
      setLoading(false);
    }
  };

  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const dispatch = useDispatch();
  // const addresses = useSelector((state) => state.address.address);

  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addAddress(text));
      setText("");
      setOpenForm(false);
    }
  };

  // const handleEdit = (id) => {
  //   if (editText.trim() !== "") {
  //     dispatch(editAddress({ id, newAddress: editText }));
  //     setEditText("");
  //     setOpenEditFormId(null);
  //   }
  // };

  const handleOpenEditForm = (id) => {
    if (openEditFormId === id) {
      setOpenEditFormId(null);
    } else {
      setOpenEditFormId(id);
    }
  };

  return (
    <div className="deliveryAddress">
      <span className="title">Delivery Address</span>
      <div className="customerAddress">
        {addresses.map((address) => (
          <div className="row" key={address.id}>
            <div className="newAddress">
              <p className="address">{address.address}</p>
              <button
                onClick={() => {
                  handleOpenEditForm(address.id);
                  handleAddress(address.id);
                }}
                className={`edit ${
                  openEditFormId === address.id ? "hidden" : ""
                }`}
              >
                Edit
              </button>
              <button
                className="edit"
                onClick={() => handleDeleteAddress(address.id)}
              >
                Delete
              </button>
              {!address.is_default && (
                <button
                  className="edit"
                  onClick={() => {
                    handleDefaultAddress(address.id);
                    setOrderAddress(defaultAddress);
                  }}
                >
                  Make default address
                </button>
              )}
            </div>
            {openEditFormId === address.id && (
              <div className="editAddress">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <form
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handleEdit(address.id, editText);
                      handleEditAddress(address.id, editText);
                    }}
                    action=""
                    className="editForm visible"
                  >
                    <textarea
                      name="address"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></textarea>
                    {validationErrors.address && (
                      <span>{validationErrors.address}</span>
                    )}
                    <button className="save">Save</button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="addAddress">
        <span onClick={() => setOpenForm(!openForm)}>+ Add New Address</span>
      </div>
      {openForm && (
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
            handleCreateAddress(text);
          }}
          action=""
          className="editForm visible"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="newAddress"
            name="address"
          ></textarea>
          {validationErrors.address && <span>{validationErrors.address}</span>}
          <button className="save">Save</button>
        </form>
      )}
    </div>
  );
}

export default DeliveryAddress;
