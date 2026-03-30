import { useState } from "react";
import { userService } from "../api/userService";
import "../styles/app.css";
import Button from "../components/button";
import Input from "../components/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { SetUser } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const user = await userService.register({
                name,
                email,
                password,
                role: "USER"
            });
            SetUser(user);

            localStorage.setItem("user", JSON.stringify(user));
            alert("Conta criada!");
            navigate("/");

        } catch (err: any) {
            alert(err.response?.data || "Erro");
        }
    };

    return (
        <div className="container">
            <h1>Cadastro</h1>

            <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />

            <Button text="Criar conta" onClick={handleRegister} />
        </div>
    );
}