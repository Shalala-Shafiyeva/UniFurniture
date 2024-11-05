import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function AboutTeamMemberEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  // const [members, setMembers] = useState([]);
  const initialStateMember = {
    name: "",
    surname: "",
    position: "",
    profile: "",
  };
  const [valueOfMember, setValueOfMember] = useState(initialStateMember);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-team-member/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        console.log(result.data);
        setValueOfMember(result.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchMember();
  }, []);

  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", valueOfMember.name);
    formData.append("surname", valueOfMember.surname);
    formData.append("position", valueOfMember.position);
    formData.append("profile", valueOfMember.profile);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-team-member/edit/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});

        navigate("/dashboard/about/team");
      }
    } catch (error) {
      console.error("Error: ", error);
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
                <h3>Edit member</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleMemberFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="titleHelp"
                        placeholder="Enter name"
                        value={valueOfMember.name}
                        onChange={(e) => {
                          setValueOfMember({
                            ...valueOfMember,
                            name: e.target.value,
                          });
                        }}
                        name="name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="surname">Surname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="surname"
                        aria-describedby="titleHelp"
                        placeholder="Enter surname"
                        value={valueOfMember.surname}
                        onChange={(e) => {
                          setValueOfMember({
                            ...valueOfMember,
                            surname: e.target.value,
                          });
                        }}
                        name="surname"
                      />
                    </div>
                    {errors.surname && (
                      <p className="text-danger">{errors.surname}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="position">Position</label>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        aria-describedby="titleHelp"
                        placeholder="Enter position"
                        value={valueOfMember.position}
                        onChange={(e) => {
                          setValueOfMember({
                            ...valueOfMember,
                            position: e.target.value,
                          });
                        }}
                        name="position"
                      />
                    </div>
                    {errors.position && (
                      <p className="text-danger">{errors.position}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Profile</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        aria-describedby="imageHelp"
                        onChange={(e) => {
                          setValueOfMember({
                            ...valueOfMember,
                            profile: e.target.files[0],
                          });
                        }}
                        name="profile"
                      />
                    </div>
                    {errors.profile && (
                      <p className="text-danger">{errors.profile}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Edit
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

export default AboutTeamMemberEdit;
