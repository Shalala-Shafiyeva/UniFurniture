import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function AboutTeam() {
  const [titles, setTitles] = useState([]);
  const [members, setMembers] = useState([]);
  const initialStateTitle = {
    title: "",
  };
  const initialStateMember = {
    name: "",
    surname: "",
    position: "",
    profile: "",
  };
  const [valueOfTitle, setValueOfTitle] = useState(initialStateTitle);
  const [valueOfMember, setValueOfMember] = useState(initialStateMember);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard/about/team-title",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setTitles(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard/about/team-member",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setMembers(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchTitles();
    fetchMembers();
  }, []);

  const handleTitleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", valueOfTitle.title);
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/team-title/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        setValueOfTitle(initialStateTitle);

        navigate("/dashboard/about/team");
      }
    } catch (error) {
      console.error("Error creating title:", error);
    }
  };
  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", valueOfMember.name);
    formData.append("surname", valueOfMember.surname);
    formData.append("position", valueOfMember.position);
    formData.append("profile", valueOfMember.profile);
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/team-member/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        setValueOfMember(initialStateMember);

        navigate("/dashboard/about/team");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  const handleDeleteTitle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/dashboard/about/team-title/delete/${id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      const result = await response.json();
      setTitles(titles.filter((title) => title.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/dashboard/about/team-member/delete/${id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      const result = await response.json();
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handlePublishTitle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/dashboard/about/team-title/publish/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
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
                <h2>Team of About page</h2>
                <h3>Create a new team</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleTitleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of team section</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        value={valueOfTitle.title}
                        onChange={(e) => {
                          setValueOfTitle({
                            ...valueOfTitle,
                            title: e.target.value,
                          });
                        }}
                        name="title"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-8 p-4">
                <h3>Create a new member</h3>
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
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              <h2>Titles of About page</h2>
              {titles.length == 0 ? (
                <p>No title found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Title</td>
                      <td scope="col">Published</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {titles.map((title) => (
                      <tr key={title.id}>
                        <td>{title.title}</td>
                        <td>
                          {!title.is_pubish ? "published" : "not published"}
                        </td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/about/team/title/edit/${title.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteTitle(title.id)}
                          >
                            Delete
                          </button>
                          {!title.is_publish && (
                            <button
                              className="btn btn-danger"
                              onClick={() => handlePublishTitle(title.id)}
                            >
                              Publish
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="row p-4">
              <h2>Members of team About page</h2>
              {members.length == 0 ? (
                <p>No member found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Name</td>
                      <td scope="col">Surname</td>
                      <td scope="col">Position</td>
                      <td scope="col">Profile</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.surname}</td>
                        <td>{member.position}</td>
                        <td>
                          <img width="100"
                            src={`http://localhost:8000/storage/${member.profile}`}
                            alt="Profile"
                          />
                        </td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/about/team/member/edit/${member.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteMember(member.id)}
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

export default AboutTeam;
