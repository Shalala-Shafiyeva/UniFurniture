import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress } from "../../slices/addressSlice";
import { useQuery, useMutation, useQueryClient } from "react-query";

function DeliveryAddress({ orderAddress, setOrderAddress }) {
  const [defaultAddress, setDefaultAddress] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  // Fetch addresses
  const {
    data: addresses = [],
    isLoading,
    error,
  } = useQuery("addresses", async () => {
    const response = await fetch("http://localhost:8000/api/address/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    if (!result.success)
      throw new Error(result.message || "Failed to fetch addresses");
    return result.data;
  });

  useEffect(() => {
    if (defaultAddress) {
      setOrderAddress(defaultAddress);
    }
  }, []);

  //Fetch Default Address
  const { data: defaultAddressData = "" } = useQuery(
    "defaultAddress",
    async () => {
      const response = await fetch(
        "http://localhost:8000/api/address/showDefaultAddress",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      return result.data;
    }
  );

  // Create address
  const createAddressMutation = useMutation(
    async (address) => {
      const response = await fetch("http://localhost:8000/api/address/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ address }),
      });
      const result = await response.json();
      if (response.status === 422) throw result.errors;
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addresses"); // Refresh address list
        setOpenForm(false);
        setText("");
      },
      onError: (errors) => {
        console.error("Validation errors:", errors);
      },
    }
  );
  // Delete address
  const deleteAddressMutation = useMutation(
    async (id) => {
      const response = await fetch(
        `http://localhost:8000/api/address/delete/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addresses");
      },
    }
  );

  // Edit address
  const editAddressMutation = useMutation(
    async ({ id, address }) => {
      const response = await fetch(
        `http://localhost:8000/api/address/edit/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ address }),
        }
      );
      const result = await response.json();
      if (response.status === 422) throw result.errors;
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addresses");
        setEditText("");
        setOpenEditFormId(null);
      },
    }
  );

  // Set default address
  const defaultAddressMutation = useMutation(
    async (id) => {
      const response = await fetch(
        `http://localhost:8000/api/address/default/${id}`,
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
        setOrderAddress(result.data.address);
        localStorage.setItem("defaultAddress", result.data.address);
      }
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("addresses");
      },
    }
  );

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

  const handleAdd = () => {
    if (text.trim()) createAddressMutation.mutate(text);
  };

  const handleEdit = (id) => {
    if (editText.trim()) editAddressMutation.mutate({ id, address: editText });
  };

  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const dispatch = useDispatch();
  // const addresses = useSelector((state) => state.address.address);

  // const handleAdd = () => {
  //   if (text.trim() !== "") {
  //     dispatch(addAddress(text));
  //     setText("");
  //     setOpenForm(false);
  //   }
  // };

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
                onClick={() => deleteAddressMutation.mutate(address.id)}
              >
                Delete
              </button>
              {!address.is_default && (
                <button
                  className="edit"
                  onClick={() => {
                    defaultAddressMutation.mutate(address.id);
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
                      handleEdit(address.id);
                    }}
                    action=""
                    className="editForm visible"
                  >
                    <textarea
                      name="address"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></textarea>
                    {editAddressMutation.error?.address && (
                      <span>{editAddressMutation.error.address}</span>
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
          {createAddressMutation.error?.address && (
            <span>{createAddressMutation.error?.address}</span>
          )}
          <button className="save">Save</button>
        </form>
      )}
    </div>
  );
}

export default DeliveryAddress;
