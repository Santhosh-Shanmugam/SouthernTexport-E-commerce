import React from 'react'
import './Contact.css'

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "a8cf2cad-503d-4abc-8d1a-335fd6ad347d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      alert(res.message);
    }
  };
  return (
    <div id='contact' className="contact">
   <div className="contact-title">
    <h1>Get in touch</h1>

   </div>
   <div className="contact-sec">
 
    <form onSubmit={onSubmit} className='contact-right'>
        <label htmlFor=''>Your Name</label>
        <input type='text' placeholder='Enter your name' name='name'></input>
        <label htmlFor=''>Your Email</label>
        <input type='email' placeholder='Enter your email' name='email'></input>
        <label htmlFor=''>Write the message here</label>
        <textarea name='message' rows='8' placeholder='Enter your message'></textarea>
            <button  className="button-contact" type='submit' >Submit now</button>
       

          </form>
        </div>

        </div>
  )
}

export default Contact
