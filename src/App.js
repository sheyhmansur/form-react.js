import React, { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");

  // emailDirty - другое состояние, которая означает были мы внутри инпута или нет. По умолчанию будет false, но как только коснемся инпута - должны будем делать его уже true

  // Этот event срабатывает в тот момент, когда пользователь покинул поле ввода, т.е убрал курсор из инпута

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="app">
      <form>
        <h1>Регистрация</h1>
        {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
        <input
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email..."
        />
        {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <input
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Введите ваш пароль..."
        />
        <button>registartion</button>
      </form>
    </div>
  );
};

export default App;
