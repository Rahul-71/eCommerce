import React, { useState } from "react";

const contactDB =
  "https://react-http-10b6e-default-rtdb.firebaseio.com/contactdb";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const phoneValidation = phone.length > 0 && phone.length !== 10;

  const saveHandler = async (e) => {
    e.preventDefault();

    if (phoneValidation) {
      console.log("phoneValidation is failed");
      return;
    }

    // console.log(`name: ${name} email: ${email} phone: ${phone}`);
    const contactDetail = {
      name: name,
      mailId: email,
      phone: phone,
    };

    const response = await fetch(`${contactDB}.json`, {
      method: "POST",
      body: JSON.stringify(contactDetail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("logged data: " + JSON.stringify(data));

    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <div className="d-flex row text-center align-items-center justify-content-center">
      <h2>Contact Us</h2>
      <form
        className="d-block py-4 border col-sm-4 row border-2 rounded"
        onSubmit={saveHandler}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name{" "}
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone{" "}
          </label>
          <input
            type="number"
            id="phone"
            className="form-control"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneValidation && (
            <p className="text-danger">Phone number must be 10 digits</p>
          )}
        </div>
        <button type="submit" className="btn w-25 btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
