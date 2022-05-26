import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Container } from './styles';

const ContactMe: React.FC = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setSending(true);

    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        setSuccess(true);
        setSending(false);
      }, (error) => {
        console.log(error.text);
        setSending(false);
      });
  };

  return (
    <Container>
      {!success && !sending && (
        <form ref={form} onSubmit={sendEmail}>
          <div className="row">
            <input type="text" name="from_name" placeholder="Name"/>
            <input type="email" name="from_email" placeholder="Email address" required/>
          </div>
          <div className="row">
            <textarea name="message" placeholder="Message" required/>
          </div>
          <div className="flex-end">
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>Send</Button>
          </div>
        </form>
      )}
      {success && (
        <h4>Thank you for your message!</h4>
      )}
      {success && (
        <img src="thanks.gif"/>
      )}
      {success && (
        <h4>I will get back to you really soon.</h4>
      )}
      {sending && (
        <h4>Sending me a message...</h4>
      )}
      {sending && (
        <img src="mail-sending.gif"/>
      )}
    </Container>
  );
}

export default ContactMe;