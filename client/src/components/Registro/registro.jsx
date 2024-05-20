import './InicioDeSesion.css'
import { useState } from "react";

export function Registro() {
    const [Curp, setCurp] = useState("")
    const [Password, setPassword] = useState("")
    const [Nombre, setNombre] = useState("")
    const [Apellido, setApellido] = useState("")
    const [Correo, setCorreo] = useState("")
    const [Estado, setEstado] = useState("")
    const [Ciudad, setCiudad] = useState("")
    const [CodigoPostal, setCodigoPostal] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (Curp === "" || Password === "" || Nombre === "" || Apellido === "" || Correo === "" || Estado === "" || Ciudad === "" || CodigoPostal === "") {
            setError(true)
            return
        }
        setError(false)

        // Aquí puedes realizar la lógica para enviar los datos del formulario al backend para el registro
    }

    return (
        <>
            <section>
                <h1>Registro</h1>

                <form className="registro" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="CURP"
                        size="40"
                        value={Curp}
                        onChange={e => setCurp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        size="40"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        size="40"
                        value={Nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        size="40"
                        value={Apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Correo"
                        size="40"
                        value={Correo}
                        onChange={e => setCorreo(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        size="40"
                        value={Estado}
                        onChange={e => setEstado(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ciudad"
                        size="40"
                        value={Ciudad}
                        onChange={e => setCiudad(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Código Postal"
                        size="40"
                        value={CodigoPostal}
                        onChange={e => setCodigoPostal(e.target.value)}
                    />
                    <button type="submit">Registrarse</button>
                </form>
                {error && <p>Todos los campos son obligatorios</p>}
            </section>
        </>
    );
}

export default Registro;
