import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaComponentProps {
  onVerify: (token: string | null) => void;
}

const ReCaptchaComponent = ({ onVerify }: ReCaptchaComponentProps) => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleChange = (value: string | null) => {
    setCaptchaValue(value);
    onVerify(value);
  };

  return (
    <ReCAPTCHA
      sitekey="6LdjFiUrAAAAAEi4Atc7vFBpMY09H3A2pQr5OxTn"
      onChange={handleChange}
    />
  );
};

export default ReCaptchaComponent;
