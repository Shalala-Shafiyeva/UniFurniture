import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, editAddress } from "../../slices/addressSlice";

function DeliveryAddress() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openEditFormId, setOpenEditFormId] = useState(null);
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.address);
  console.log(addresses);
  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addAddress(text));
      setText("");
      setOpenForm(false);
    }
  };

  const handleEdit = (id) => {
    if (editText.trim() !== "") {
      dispatch(editAddress({ id, newAddress: editText }));
      setEditText("");
      setOpenEditFormId(null);
    }
  };

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
              <p className="address">{address.adrs}</p>
              <button
                onClick={() => handleOpenEditForm(address.id)}
                className={`edit ${openEditFormId === address.id ? "hidden" : ""}`}
              >
                Edit
              </button>
            </div>
            {
              openEditFormId === address.id && (
                <div className="editAddress">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(address.id, editText);
                  }}
                  action=""
                  className="editForm visible"
                >
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  ></textarea>
                  <button
                    className="save"
                  >
                    Save
                  </button>
                </form>
              </div>
              )
            }
          </div>
        ))}
      </div>
      <div className="addAddress">
        <span onClick={() => setOpenForm(!openForm)}>+ Add New Address</span>
      </div>
      {
        openForm && (
            <form
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
            ></textarea>
            <button
              className="save"
            >
              Save
            </button>
          </form>
        )
      }

    </div>
  );
}

export default DeliveryAddress;
