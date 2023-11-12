import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (email && password) {
      try {
        const response = await fetch('http://127.0.0.1:5000/login_validation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const validationStatus = await response.json();
          if (validationStatus.isValid) {
            console.log('Login successful');
            navigate('/dashboard');
          } else if(validationStatus.isInvalidPassword) {
            console.error('Invalid password');
          } else if(validationStatus.isInvalidEmail){
            console.error('Invalid email');
          }
        } else {
          console.error('Failed to validate account');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  return (
    <div>
        <title>Super Shy</title>
        {/* Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Favicon icon */}
        <link rel="icon" href="public/template/assets/images/favicon.ico" type="image/x-icon" />
        {/* fontawesome icon */}
        <link rel="stylesheet" href="public/template/assets/fonts/fontawesome/css/fontawesome-all.min.css" />
         {/* animation css */}
        <link rel="stylesheet" href="public/template/assets/plugins/animation/css/animate.min.css" />
        {/* vendor css */}
        <link rel="stylesheet" href="public/template/assets/css/style.css" />

        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="card card-login">
              <div className="card-body text-center">
                <div className="mb-4">
                  <img src="public/template/assets/images/supershy.png" alt="Logo" />
                </div>
                <div className="input-group mb-3">
                  <label className="input-group mb-1">Email</label>
                  <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group mb-4">
                  <label className="input-group mb-1">Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                    <label htmlFor="checkbox-fill-a1" className="cr"> Remember Me</label>
                  </div>
                </div>

                <span className="forgot-password">Forgot your password?</span>
                <button className="btn btn-primary login shadow-2 mb-4" onClick={handleLogin}>LOG IN</button>

              </div>
              <p className="mb-0 text-center">Don’t have an account? <span href="" className="register text-c-blue">Register</span></p>
            </div>
          </div>
        </div>


        {/* Required Js */}
        <script src="public/template/assets/js/vendor-all.min.js"></script>
        <script src="public/template/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    </div>
  );
};

export default Login;
