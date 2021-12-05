import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("Поле ввода не должно быть пустым!");
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  // const [password, setPassword] = useState("");
  // const [passwordDirty, setPasswordDirty] = useState(false);
  // const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  // emailDirty - другое состояние, которая означает были мы внутри инпута или нет. По умолчанию будет false, но как только коснемся инпута - должны будем делать его уже true

  useEffect(() => {
    if (emailError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, nameError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    e.target.value = e.target.value.replace(/[0-9\+\=\\/``\*]|\./, "");
    if (!e.target.value) {
      setNameError("Поле обязательно для заполнения");
    } else {
      setNameError("");
    }
  };

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

  // const passwordHandler = (e) => {
  //   setPassword(e.target.value);
  //   if (e.target.value.length < 3 || e.target.value.length > 8) {
  //     setPasswordError("Пароль должен быть длиннее 3 и меньше 8");
  //     if (!e.target.value) {
  //       setPasswordError("Пароль не может быть пустым!");
  //     }
  //   } else {
  //     setPasswordError("");
  //   }
  // };

  // Этот event срабатывает в тот момент, когда пользователь покинул поле ввода, т.е убрал курсор из инпута
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
    }
  };

  return (
    <div className="app">
      <form>
        <h1>Регистрация</h1>
        {nameDirty && nameError && <div style={{ color: "red" }}>{nameError}</div>}
        <input
          onChange={(e) => nameHandler(e)}
          onInput={(e) => nameHandler(e)}
          value={name}
          onBlur={(e) => blurHandler(e)}
          name="name"
          type="text"
          placeholder="Введите ваше имя..."
        />
        {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email..."
        />
        {/* {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Введите ваш номер телефона"
        /> */}
        <button disabled={!formValid} type="submit">
          registartion
        </button>
      </form>
    </div>
  );
};

export default App;
