import React, { useState, useEffect } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  // emailDirty - другое состояние, которая означает были мы внутри инпута или нет. По умолчанию будет false, но как только коснемся инпута - должны будем делать его уже true

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  // Когда пользователь пытается что-то ввести надо изменять
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("Пароль должен быть длиннее 3 и меньше 8");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым!");
      }
    } else {
      setPasswordError("");
    }
  };

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
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email..."
        />
        {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Введите ваш пароль..."
        />
        <button disabled={!formValid} type="submit">
          registartion
        </button>
      </form>
    </div>
  );
};

export default App;
