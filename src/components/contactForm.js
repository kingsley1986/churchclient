import React from "react";

/* const ContactForm = ({ values, setValues, onSubmit }) => (
  <form
    onSubmit={evt => {
      evt.preventDefault();
      onSubmit();
    }}
  >
    <label>
      Name:
      <input
        value={values.name}
        onChange={evt => setValues({ ...values, name: evt.target.value })}
      />
    </label>
    <label>
      Description:
      <textarea
        value={values.message}
        onChange={evt => setValues({ ...values, message: evt.target.value })}
      />
    </label>
    <button type="submit">Send Form</button>
  </form>
);

export default ContactForm;
 */

const ContactForm = ({ values, setValues, onSubmit }) => (
  <div className="contactFormApp">
    <p>Send your prayer request here</p>
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit();
        }}
      >
        <label>Name</label>
        <input
          className="contactinput"
          type="text"
          id="fname"
          name="name"
          placeholder="Your name.."
          value={values.name}
          onChange={(evt) => setValues({ ...values, name: evt.target.value })}
        />
        {/*      <label>Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="Your last name.."
        /> */}

        <label>Email</label>
        <input
          className="contactinput"
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          onChange={(evt) => setValues({ ...values, email: evt.target.value })}
        />

        <label>Message</label>
        <textarea
          className="contactinput"
          value={values.request}
          placeholder="Type you message here.."
          onChange={(evt) =>
            setValues({ ...values, request: evt.target.value })
          }
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  </div>
);

export default ContactForm;
