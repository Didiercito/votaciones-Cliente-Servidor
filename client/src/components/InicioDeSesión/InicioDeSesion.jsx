import './InicioDeSesion.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export function Inicio() {
    const [Curp, setCurp] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Curp === "" || Password === "") {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CURP: Curp,
                    password: Password
                })
            });

            const data = await response.json(); // Extraer los datos de la respuesta

            if (response.ok) {
                console.log('Inicio de sesión exitoso', data); // Mostrar toda la información
                // Aquí podrías manejar el token, los datos del usuario, etc.
                // Por ejemplo, almacenar el token en el almacenamiento local para usarlo en las solicitudes futuras
            } else {
                console.error('Error al iniciar sesión:', data.message);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    }

    const handleRegisterRedirect = () => {
        navigate('/registro'); 
    }

    return (
        
        <section >
            <h1 className='Titulo'>Iniciar Sesión</h1>

            <form className="inicioDeSesion" onSubmit={handleSubmit}>
                <input className='Extraer'
                    type="text"
                    placeholder="Curp"
                    size="40"
                    value={Curp}
                    onChange={e => setCurp(e.target.value)}
                />
                <input  className='Extraer'
                    type="password"
                    placeholder="Contraseña"
                    size="40"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className='Divicion'>
                    
                    <button className='Botones' type="submit">Iniciar Sesión</button>
                <button className='Botones' onClick={handleRegisterRedirect}>Registrarse</button>
                </div>
                </form>
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    );
}

export default Inicio;
