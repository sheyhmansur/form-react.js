import React, { useState, useEffect } from "react";

function Form() {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("Поле ввода не должно быть пустым!");
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [phone, setPhone] = useState("");
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [phoneError, setPhoneError] = useState("Поле обязательно для заполнения");
  const [checked, setChecked] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || nameError || phoneError || !checked) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError, checked]);

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

    e.target.value = e.target.value.replace(/[^\d\s\+\()]/g, "");
    console.log(e.target.value.length);

    if (!e.target.value) {
      setPhoneError("Заполните пожалуйста!");
    } else {
      setPhoneError("");
    }
  };

  const checkedHandler = () => {
    setChecked(!checked);
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
        break;
    }
  };

  return (
    <div className="form">
      <form>
        <h1 className="form__title">Регистрация</h1>
        <div className="form__descr">
          Уже есть аккаунт?{" "}
          <a className="form__descr" href="#">
            Войти
          </a>
        </div>

        <input
          className="form__input"
          onChange={(e) => nameHandler(e)}
          onInput={(e) => nameHandler(e)}
          value={name}
          onBlur={(e) => blurHandler(e)}
          name="name"
          type="text"
          placeholder="Введите ваше имя..."
        />
        {nameDirty && nameError && <div style={{ color: "red" }}>{nameError}</div>}
        <input
          className="form__input"
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email..."
        />
        {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
        <input
          className="form__input"
          onChange={(e) => phoneHandler(e)}
          onInput={(e) => phoneHandler(e)}
          value={phone}
          onBlur={(e) => blurHandler(e)}
          name="phone"
          type="text"
          maxLength="12"
          placeholder="Введите ваш номер телефона"
        />
        {phoneDirty && phoneError && <div style={{ color: "red" }}>{phoneError}</div>}

        <select>
          <option style={{ display: "none" }}>Язык</option>
          <option value="">Русский</option>
          <option value="">Английский</option>
          <option value="">Китайский</option>
          <option value="">Испанский</option>
        </select>

        <input onChange={checkedHandler} checked={checked} name="checkbox" type="checkbox" />
        <button disabled={!formValid} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Form;
