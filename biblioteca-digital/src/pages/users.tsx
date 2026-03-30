import { useEffect, useState } from "react";
import { userService } from "../api/userService";

import "../styles/app.css";
import Navbar from "../components/navBar";
import type { User } from "../types/User";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Usuários</h1>

                {users.map((u) => (
                    <div key={u.id} style={styles.card}>
                        <p><strong>{u.name}</strong></p>
                        <p>{u.email}</p>
                        <p>{u.role}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

const styles = {
    card: {
        background: "#334155",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px"
    }
};