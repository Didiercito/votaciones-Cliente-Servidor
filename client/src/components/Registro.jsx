import './Registro.css'
import { useState } from "react";

export function Registro() {
    const [Curp, setCurp] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (Curp === "" || Password === "") {
            setError(true)
            return
        }
        setError(false)
    }

    return ( 
        <section>
            <h1>Registro</h1>

            <form className="registro" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Curp:"
                    size="40"
                    value={Curp}
                    onChange={e => setCurp(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña:"
                    size="40"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    );
}

export default Registro;
