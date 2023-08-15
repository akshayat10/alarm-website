// scenes/survey/SurveyWithLogin.jsx
import React, { useState } from 'react';
import LoginForm from 'scenes/loginForm';
import SurveyForm from 'scenes/surveyForm'; 


const SurveyWithLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <SurveyForm /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default SurveyWithLogin;
