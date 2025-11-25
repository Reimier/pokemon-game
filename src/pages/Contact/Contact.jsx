import emailjs from "emailjs-com";
import { useState } from "react";
import "./contact.css";
import { NavLink } from "react-router";

export default function Contact() {
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_248vvxb",
        "template_m1hfcl6",
        e.target,
        "Y2oktYdMFhwEhWryt"
      )
      .then(
        () => setStatus(alert("Message sent. Thank you for reaching out!")),
        e.target.reset(),
        () => setStatus(alert("There seems to be a problem! try again later."))
      );
  };

  return (
    <div className="contact-page">
      <h1>Contact Developer</h1>

      <form className="contact-form" onSubmit={sendEmail}>
        <label>Name</label>
        <input placeholder="Enter your name" name="name" type="text" required />

        <label>Email</label>
        <input placeholder="Enter your email" name="email" type="email" required />

        <label>Message</label>
        <textarea placeholder="What do you want to say?" name="message" rows="6" required></textarea>

        <button className="submit-btn">Send Message</button>

        <NavLink to="/">
        <button className="back-btn" >Go Back</button>
        </NavLink> 

      </form>

      {status && <p>{status}</p>}
    </div>
  );
}


