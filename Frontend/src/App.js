import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
      <div className="App">
        {isLogin ? (
            <Login onSwitchToSignup={switchToSignup} />
        ) : (
            <Signup onSwitchToLogin={switchToLogin} />
        )}
      </div>
  );
}

export default App;
