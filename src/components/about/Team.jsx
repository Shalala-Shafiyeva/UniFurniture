import React, { useEffect, useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function Team() {
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about/team-member",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setMembers(result);
      } catch (error) {
        console.log("Error", error);
      }
    };

    const fetchTitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about/team-title",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setTitle(result);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchMembers();
    fetchTitles();
  }, []);
  return (
    <section className="team" data-aos="fade-up">
      {/* {title.data && <h3>{title.data.title}</h3>}
      <div className="memberCards">
        {members.data && members.data.length > 0 ? (
          members.data.map((member) => (
            <div key={member.id} className="card">
              <div className="img">
                <img
                  src={`http://localhost:8000/storage/${member.profile}`}
                  alt="Membber image"
                />
              </div>
              <div className="desc">
                <span>
                  {member.name} {member.surname}
                </span>
                <span>{member.position}</span>
              </div>
            </div>
          ))
        ) : (
          <h3>No team members</h3>
        )}
      </div> */}
      <h3>
        Meet the <span>amazing team</span> behind Startply X
      </h3>
      <div className="memberCards">
        {data.membersOfTeam.map((member) => (
          <div key={member.id} className="card">
            <div className="img">
              <img src={member.img} alt="Membber image" />
            </div>
            <div className="desc">
              <span>
                {member.name} {member.surname}
              </span>
              <span>{member.position}</span>
            </div>
          </div>
        ))}
      </div>
      <Link to="/login" className="getStart">
        Get Started
      </Link>
    </section>
  );
}

export default Team;
