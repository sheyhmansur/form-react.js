import React, { useState, useEffect } from "react";
import arrow from "./icons/arrow_down.svg";
function Form() {
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState("Поле ввода не должно быть пустым");
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Поле ввода не должно быть пустым");
  const [phone, setPhone] = useState("");
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [phoneError, setPhoneError] = useState("Поле ввода не должно быть пустым");
  const [checked, setChecked] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("Язык");
  const options = ["Русский", "Английский", "Китайский", "Испанский"];

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
      setEmailError("Введено не корректное значение");
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
    <div className="wrapper">
      <form className="form">
        <h1 className="form__title">Регистрация</h1>
        <div className="form__descr">
          Уже есть аккаунт?{" "}
          <a className="form__descr" href="#">
            Войти
          </a>
        </div>
        <label className="form__label">Имя</label>
        <input
          className="form__input"
          onChange={(e) => nameHandler(e)}
          onInput={(e) => nameHandler(e)}
          value={name}
          onBlur={(e) => blurHandler(e)}
          name="name"
          type="text"
          placeholder="Введите ваше имя"
        />
        {nameDirty && nameError && <span className="error">{nameError}</span>}
        <label className="form__label">Email</label>
        <input
          className="form__input"
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email"
        />
        {emailDirty && emailError && <span className="error">{emailError}</span>}
        <label className="form__label">Номер телефона</label>
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
        {phoneDirty && phoneError && <span className="error">{phoneError}</span>}
        <label className="form__label">Язык</label>
        {/* DROPDOWN */}

        <div className="dropdown">
          <div tabIndex="0" className="dropdown__btn" onClick={(e) => setIsActive(!isActive)}>
            {selected}
            <img src={arrow} width="16px" height="9px" alt="" />
          </div>
          {isActive && (
            <div className="dropdown__content">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    setSelected(option);
                    setIsActive(false);
                  }}
                  className="dropdown__item"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* DROPDOWN */}

        {/* <input className="form__checkbox" onChange={checkedHandler} checked={checked} name="checkbox" type="checkbox" /> */}
        <div className="inner">
          <input
            type="checkbox"
            className="custom-checkbox"
            onChange={checkedHandler}
            checked={checked}
            id="happy"
            name="happy"
            value="yes"
          />
          <label htmlFor="happy"></label>
          <label className="policy">
            Принимаю <a href="#">условия</a> использования
          </label>
        </div>

        <button className="form__btn" disabled={!formValid} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Form;
