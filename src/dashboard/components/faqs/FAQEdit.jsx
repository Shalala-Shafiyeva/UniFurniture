import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

export default function FAQEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    question: "",
    answer: "",
    option_id: "",
  });
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const fetchFaq = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/faqs/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setValues({
        question: result.data.question,
        answer: result.data.answer,
        option_id: result.data.option_id,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
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
    fetchFaq();
    fetchOptions();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/faqs/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        navigate("/dashboard/faq");
      }
    } catch (error) {
      console.error("Error editing:", error);
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
              <h2>FAQs page</h2>
              <h3>Create a new FAQ</h3>
              <form
                className="col-12 border p-4 d-flex flex-column gap-3"
                method="POST"
                onSubmit={(e) => {
                  handleFormSubmit(e);
                }}
              >
                <div>
                  <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input
                      type="text"
                      className="form-control"
                      id="question"
                      aria-describedby="titleHelp"
                      placeholder="Enter question"
                      value={values.question}
                      onChange={(e) => {
                        setValues({ ...values, question: e.target.value });
                      }}
                      name="question"
                    />
                  </div>
                  {errors.question && (
                    <p className="text-danger">{errors.question}</p>
                  )}
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="question">Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      id="answer"
                      aria-describedby="titleHelp"
                      placeholder="Enter answer"
                      value={values.answer}
                      onChange={(e) => {
                        setValues({ ...values, answer: e.target.value });
                      }}
                      name="answer"
                    />
                  </div>
                  {errors.answer && (
                    <p className="text-danger">{errors.answer}</p>
                  )}
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="option_id">Choose option</label>
                    <select
                      name="option_id"
                      id="option_id"
                      className="form-control"
                      value={values.option_id}
                      onChange={(e) =>
                        setValues({ ...values, option_id: e.target.value })
                      }
                    >
                      <option value="">Choose option</option>
                      {options?.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.option_id && (
                    <p className="text-danger">{errors.option_id}</p>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Edit FAQ
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  )
}
