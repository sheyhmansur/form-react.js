import react from "react";
import { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="app">
      <form>
        <h1>Регистрация</h1>
        <input name="email" type="text" placeholder="Введите ваш email..." />
        <input
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
