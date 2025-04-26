// components/ReCaptchaComponent.jsx
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptchaComponent = ({ onVerify }) => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (value) => {
    setCaptchaValue(value);
    onVerify(value); // Puedes enviar el valor al padre o hacer validación aquí
  };

  return (
      <ReCAPTCHA
        sitekey="6LdjFiUrAAAAAEi4Atc7vFBpMY09H3A2pQr5OxTn"
        onChange={handleChange}
      />
  );
};

export default ReCaptchaComponent;
