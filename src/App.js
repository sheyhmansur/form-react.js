import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("Поле ввода не должно быть пустым!");
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [phone, setPhone] = useState("");
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [phoneError, setPhoneError] = useState("Поле обязательно для заполнения");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || nameError || phoneError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError]);

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

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    setPhoneError("Заполните пожалуйста!");
    e.target.value = e.target.value.replace(/[^\d\s\+\()]/g, "");
    if (!e.target.value) {
      setPhoneError("Заполните пожалуйста!");
    } else {
      setPhoneError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
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
        {phoneDirty && phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
        <input
          onChange={(e) => phoneHandler(e)}
          onInput={(e) => phoneHandler(e)}
          value={phone}
          onBlur={(e) => blurHandler(e)}
          name="phone"
          type="text"
          placeholder="Введите ваш номер телефона"
        />
        <button disabled={!formValid} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default App;
