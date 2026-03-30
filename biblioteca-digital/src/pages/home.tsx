
import Navbar from "../components/navBar";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Home</h1>
                {user ? (
                    <p>Bem-vindo, {user.name} 👋</p>
                ) : (
                    <p>Faça login para continuar</p>
                )}

                
            </div>
        </>
    );
}