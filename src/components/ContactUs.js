import React, { useState } from "react";

const contactDB = `${process.env.REACT_APP_FIREBASE_DB}/contactdb`;

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  const phoneValidation = phone.length > 0 && phone.length !== 10;

  let msg = "";

  const saveHandler = async (e) => {
    e.preventDefault();

    if (phoneValidation) {
      return;
    }

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

    if (response.ok) {
      setMessage("We'll get back to you shortly!");
    } else {
      const data = await response.json();
      setMessage("Error posting to server.");
      console.log(data);
    }

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    // console.log("contact successfully logged data: " + JSON.stringify(data));

    setEmail("");
    setName("");
    setPhone("");
  };

  return (
    <div className="d-flex row text-center align-items-center justify-content-center">
      <h2>Contact Us</h2>
      {showNotification && (
        // <div className="modal" tabIndex="-1" role="dialog">
        //   <div className="modal-dialog">
        <div className="my-transition">
          <div className="alert alert-success">
            <div className="fs-5">{message}</div>
          </div>
        </div>
        //   </div>
        // </div>
      )}
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
