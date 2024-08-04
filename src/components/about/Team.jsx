import React from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function Team() {
  return (
    <section className="team">
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
