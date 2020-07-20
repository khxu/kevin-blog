import React from 'react';

const Login = ({ email, setEmail, handleLogin, isLoginButtonDisabled }) => (
  <div style={{
    padding: '0em 2em',
    border: '3px solid',
    borderRadius: '5px',
    marginBottom: '1.75em'
  }}>
    <h3>Leave a Comment</h3>
    <h4>Passwordless Auth using <a href="https://magic.link/">Magic</a></h4>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.45rem', alignItems: 'flex-start' }}>
      <label htmlFor="email">
        Email
      </label>
      <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} style={{ width: '80%' }} />
      <button onClick={handleLogin} disabled={isLoginButtonDisabled ? true : false} >{isLoginButtonDisabled ? 'Logging in...' : 'Signup/Login'}</button>
    </div>
  </div>
);

export default Login;