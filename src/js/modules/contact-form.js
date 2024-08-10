import { contactForm, contactFormButton, submitResult } from "./variables";

const contactFormSubmitHandler = async (event) => {
  event.preventDefault();

  contactForm.reset();
  contactFormButton.disabled = true;
  const formData = new FormData(contactForm);

  await fetch('https://vlrnsnk.com/contact-form-handler.php', {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    }

    throw new Error('Failed form submit');
  })
  .then((json) => {
    submitResult.textContent = 'Your message was sent successfully!';
    submitResult.classList.add('contact-form__submit-result--success');
    contactFormButton.title = 'Please, wait 5 seconds before submitting new message';
  })
  .catch((error) => {
    submitResult.textContent = 'There was an error sending Your message. Please, try contacting me via e-mail.';
    submitResult.classList.add('contact-form__submit-result--fail');
  });

  setTimeout(() => {
    contactFormButton.disabled = false;
    submitResult.textContent = '';
    submitResult.classList.remove('contact-form__submit-result--success');
    submitResult.classList.remove('contact-form__submit-result--fail');
    contactFormButton.title = '';
  }, 5000);
};

export { contactFormSubmitHandler };
