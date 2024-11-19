import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from 'react-router-dom';

function Option() {
  const [options, setOptions] = useState([]);
  const fetchOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/options", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setOptions(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchOptions();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/option/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setOptions(options.filter((option) => option.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/option/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({name: value}),
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        setValue('');
        // navigate("/dashboard/faq/options");
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  };
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row">
              <div className="col-8 p-4">
                <h2>Options of FAQs</h2>
                <h3>Create a new option</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e)=>{handleFormSubmit(e)}}
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Option name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="titleHelp"
                        placeholder="Enter name"
                        name="name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Option
                  </button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              <h2>Options of FAQs</h2>
              {options?.length == 0 ? (
                <p>No option found</p>
              ) : (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <td scope="col">Name</td>
                    <td scope="col">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {options?.map((option) => (
                      <tr key={option.id}>
                        <td>{option.name}</td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/faq/option/edit/${option.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(option.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              )} 
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Option;
