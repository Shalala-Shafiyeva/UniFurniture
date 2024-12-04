import React, { useEffect, useState } from "react";
import data from "../../data.json";

function QuestionsAccordion() {
  var filterBtns = ["1", "2", "3"];
  // let [selectedOption, setSelectedOption] = useState("1");
  let [filteredItems, setFilteredItems] = useState(data.homeQuestions);
  const [activeItem, setActiveItem] = useState(null);

  function toggleAccordion(itemId) {
    setActiveItem((prev) => (prev === itemId ? null : itemId));
  }

  let handleFilterButtonClick = (option) => {
    setSelectedOption(option);
    setFilteredItems(
      data.homeQuestions.filter((item) => item.option == option)
    );
    setActiveItem(null);
  };

  useEffect(() => {
    setFilteredItems(data.homeQuestions.filter((item) => item.option == "1"));
  }, []);

  //with backend
  const [options, setOptions] = useState([]);
  let [selectedOption, setSelectedOption] = useState(null);
  const fetchOptons = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/options", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setOptions(result.data);
      setSelectedOption(result.data[0]?.id);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchOptons();
  }, []);
  return (
    <section className="questionAccourdion" data-aos="fade-up">
      <div className="containerQuestions">
        <div className="cover">
          {options?.length > 0 && (
            <>
              <h3 className="middleTxt">Tez-tez Verilən Suallar</h3>
              <div className="filterBtns">
                {options?.map((option) => (
                  <button
                    onClick={() => handleFilterButtonClick(option?.id)}
                    key={option?.id}
                    className={`btn ${
                      selectedOption == option?.id ? "active" : ""
                    }`}
                  >
                    <span>{option?.name}</span>
                    <span className="line"></span>
                  </button>
                ))}
              </div>
              <p>
                Burada ən çox verilən sualların cavablarını tapa bilərsiniz.
                Axtardığınız məlumatı tapa bilmirsinizsə, bizimlə əlaqə
                qurmaqdan çəkinməyin!
              </p>
              <div className="accordion">
                {options
                  .find((option) => option.id === selectedOption)
                  ?.publish_faqs?.map((faq) => (
                    <div
                      key={faq.id}
                      className={`accordionItem ${
                        faq.id === activeItem ? "active" : ""
                      }`}
                      onClick={() => toggleAccordion(faq.id)}
                    >
                      <img src="/images/home/accordion.png" alt="Open icon" />
                      <span>{faq.question}</span>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
          {/* <h3 className="middleTxt">Frequently Asked Questions</h3> 
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
              <div
                key={item.id}
                className={`accordionItem ${
                  item.id === activeItem ? "active" : ""
                }`}
                onClick={(e) => {
                  toggleAccordion(item.id);
                }}
              >
                <img src="/images/home/accordion.png" alt="Open icon" />
                <span>{item.question}</span>
                <p>{item.answer}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default QuestionsAccordion;
