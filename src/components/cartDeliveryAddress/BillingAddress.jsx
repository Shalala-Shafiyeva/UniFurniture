import React, { useState } from "react";

function BillingAddress() {
  const [openForm, setOpenForm] = useState(false);
  const [text, setText] = useState("");
  const [saveForm, setSaveForm] = useState(false);
  const handleForm = () => {
    setOpenForm(!openForm);
  };
  return (
    <div className="billingAddress">
      <span className="title">Ödəmə Ünvanı</span>
      <div className="form">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="sameAddress">
            <div className="inp">
              <input type="checkbox" id="same" />
              <label htmlFor="same">Çatdırılma ünvanı ilə eyni</label>
            </div>
            <button
              onClick={() => {
                handleForm();
              }}
              className={`change ${openForm ? "hidden" : ""}`}
            >
              Dəyişdir
            </button>
          </div>
          <div className={`newBillingAddress ${!openForm ? "hidden" : ""}`}>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="save"
              onClick={() => {
                setSaveForm((prev) => !prev);
                handleForm();
              }}
            >
              Saxla
            </button>
          </div>
          <p className={`${openForm ? "hidden" : ""}`}>{text}</p>
        </form>
      </div>
    </div>
  );
}

export default BillingAddress;
