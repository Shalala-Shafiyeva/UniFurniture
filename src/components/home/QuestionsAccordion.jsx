import React, { useEffect, useState } from "react";
import data from "../../data.json";

function QuestionsAccordion() {
  var filterBtns = ["1", "2", "3"];
  let [selectedOption, setSelectedOption] = useState("1");
  let [filteredItems, setFilteredItems] = useState(data.homeQuestions);

  function toggleAccordion(e) {
    e.target.parentElement.classList.toggle('active');
  }

  let handleFilterButtonClick = (option) => {
    setSelectedOption(option);
    setFilteredItems(
      data.homeQuestions.filter((item) => item.option == option)
    );
  };

  useEffect(() => {
    setFilteredItems(data.homeQuestions.filter((item) => item.option == "1"));
  }, []);

  return (
    <section className="questionAccourdion">
      <div className="containerQuestions">
        <div className="cover">
          <h3 className="middleTxt">Frequently Asked Questions</h3>
          <div className="filterBtns">
            {filterBtns.map((btnIndex, index) => (
              <button
                onClick={() => handleFilterButtonClick(btnIndex)}
                key={index}
                className={`btn ${selectedOption === btnIndex ? "active" : ""}`}
              >
                <span>Option</span>
                <span className="line"></span>
                <span>{btnIndex}</span>
              </button>
            ))}
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit consectetur
            tortor nunc aliquam consectetur semper augue at.
          </p>
          <div className="accordion">
            {filteredItems.map((item) => (
              <div key={item.id} className="accordionItem">
                <img
                  onClick={(e)=>{toggleAccordion(e)}}
                  src="/images/home/accordion.png"
                  alt="Open icon"
                />
                <span onClick={(e)=>{toggleAccordion(e)}}>{item.question}</span>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionsAccordion;
