import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // 👈 remove
        setUser(null);
        navigate("/login");
    };

    return (
        <div style={styles.nav}>
            <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                📚 Biblioteca
            </h2>

            <div style={styles.right}>
                {user ? (
                    <>
                        <span>👤 {user.name}</span>
                        <button className="button" onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button className="button" onClick={() => navigate("/login")}>
                            Login
                        </button>
                        <button className="button" onClick={() => navigate("/register")}>
                            Cadastro
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#1e293b",
        alignItems: "center"
    },
    right: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    }
};