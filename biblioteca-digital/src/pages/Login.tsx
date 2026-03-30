import { useState } from "react";
import { userService } from "../api/userService";
import { useAuth } from "../hooks/useAuth";

import "../styles/app.css";
import Input from "../components/input";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogin = async () => {
        try {
            const user = await userService.login(email, password);
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            alert("Login realizado!");
            console.log(user);
            navigate("/")
        } catch (err: any) {
            alert(err.response?.data || "Erro ao logar");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>

            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />

            <Button text="Entrar" onClick={handleLogin} />
        </div>
    );
}