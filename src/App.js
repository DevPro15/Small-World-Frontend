// src/App.js

import "./App.css";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import dummy from "./api/dummy";
import AsyncSelect from "react-select/async";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  //handle input change event

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  //handle selection

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const fetchData = () => {
    return dummy.get("users?page=1").then((result) => {
      const res = result.data.data;
      return res;
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          company: company,
          jobTitle: jobTitle,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
        setJobTitle("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="Input_direction1">
            <input
              className="input2"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="input2"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>{" "}
          <div className="Input_direction2">
            <input
              className="input1"
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input1"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="Input_direction3">
            <input
              className="input2"
              type="text"
              value={company}
              placeholder="Company"
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              className="input2"
              type="text"
              value={jobTitle}
              placeholder="Job Title"
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div>
            <AsyncSelect
              className="Select"
              cacheOptions
              defaultOptions
              value={selectedValue}
              getOptionLabel={(e) => e.first_name + "" + e.last_name}
              getOptionValue={(e) => e.id}
              loadOptions={fetchData}
              onInputChange={handleInputChange}
              onChange={handleChange}
            />
          </div>
          <div>
            <AsyncSelect
              className="Select"
              cacheOptions
              defaultOptions
              value={selectedValue}
              getOptionLabel={(e) => e.first_name + "" + e.last_name}
              getOptionValue={(e) => e.id}
              loadOptions={fetchData}
              onInputChange={handleInputChange}
              onChange={handleChange}
            />
          </div>
          <div className="btn_center">
            <button type="submit" className="button">
              Create
            </button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    </div>
  );
}

export default App;
