import { useState } from "react";

import {
  Container,
  Dropdown,
  FormControl,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const requestData = {
      card_number: inputValue,
    };

    const response = await fetch(
      `http://localhost:8000/v1/api/${selectedOption}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );
    const responseData = await response.json();

    if (responseData.errorCode && responseData.errorMessage) {
      setError(responseData.errorMessage);
      setData(null);
    } else {
      setData(responseData);
      setError(null);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card
        className="p-4"
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Dropdown onSelect={handleOptionChange}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedOption || "Select the option"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="validateCard">
              Validate the card
            </Dropdown.Item>
            <Dropdown.Item eventKey="cardInfo">
              Get card information
            </Dropdown.Item>
            <Dropdown.Item eventKey="cardBalance">
              Get card balance information
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <FormControl
          type="number"
          placeholder="Enter card number"
          className="mt-3"
          value={inputValue}
          onChange={handleInputChange}
        />

        <Button
          variant="success"
          className="mt-3"
          onClick={handleButtonClick}
          disabled={!selectedOption || !inputValue ? true : false}
        >
          {selectedOption === "validateCard"
            ? "Validate the card"
            : selectedOption === "cardInfo"
            ? "Get card information"
            : "Get card balance information"}
        </Button>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {data ? (
          <div className="mt-3">
            {selectedOption === "validateCard" && (
              <div>
                {data.isValid ? (
                  <p>Card number {data.card} is valid</p>
                ) : (
                  <p>Card number {data.card} is not valid</p>
                )}
              </div>
            )}

            {selectedOption === "cardInfo" && (
              <div>
                <p>Card Number: {data.cardNumber}</p>
                <p>Profile Code: {data.profileCode}</p>
                <p>Profile: {data.profile}</p>
                <p>Profile (es): {data.profile_es}</p>
                <p>Bank Code: {data.bankCode}</p>
                <p>Bank Name: {data.bankName}</p>
                <p>User Name: {data.userName}</p>
                <p>User Last Name: {data.userLastName}</p>
              </div>
            )}

            {selectedOption === "cardBalance" && (
              <div>
                <p>Card: {data.card}</p>
                <p>Balance: {data.balance}</p>
                <p>Balance Date: {data.balanceDate}</p>
                <p>Virtual Balance: {data.virtualBalance}</p>
                <p>Virtual Balance Date: {data.virtualBalanceDate}</p>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/* {data && (
          <div className="mt-3">
            {selectedOption === "validateCard" && (
              <div>
                {data.isValid ? (
                  <p>Card number {data.card} is not valid</p>
                ) : (
                  <p>Card number {data.card} is valid</p>
                )}
              </div>
            )}

            {selectedOption === "cardInfo" && (
              <div>
                <p>Card Number: {data.cardNumber}</p>
                <p>Profile Code: {data.profileCode}</p>
                <p>Profile: {data.profile}</p>
                <p>Profile (es): {data.profile_es}</p>
                <p>Bank Code: {data.bankCode}</p>
                <p>Bank Name: {data.bankName}</p>
                <p>User Name: {data.userName}</p>
                <p>User Last Name: {data.userLastName}</p>
              </div>
            )}

            {selectedOption === "cardBalance" && (
              <div>
                <p>Card: {data.card}</p>
                <p>Balance: {data.balance}</p>
                <p>Balance Date: {data.balanceDate}</p>
                <p>Virtual Balance: {data.virtualBalance}</p>
                <p>Virtual Balance Date: {data.virtualBalanceDate}</p>
              </div>
            )}
          </div>
        )} */}
      </Card>
    </Container>
  );
}
