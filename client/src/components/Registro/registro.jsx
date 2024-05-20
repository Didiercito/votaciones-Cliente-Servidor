import './registro.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Registro() {
    const [Curp, setCurp] = useState('');
    const [Password, setPassword] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Estado, setEstado] = useState('');
    const [Ciudad, setCiudad] = useState('');
    const [CodigoPostal, setCodigoPostal] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de datos
        if (!Curp || !Password || !Nombre || !Apellido || !Correo || !Estado || !Ciudad || !CodigoPostal) {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CURP: Curp,
                    password: Password,
                    name: Nombre,
                    lastname: Apellido,
                    email: Correo,
                    state: Estado,
                    city: Ciudad,
                    zip_code: CodigoPostal
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Usuario registrado exitosamente', data.user);
                // Redirigir a la página de inicio de sesión o a donde sea apropiado
                navigate('/');
            } else {
                console.error('Error al registrar usuario:', data.message);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <>
            <h1 className='Registro'>Registro</h1>
            <section className='Todo'>
                <form className='registro' onSubmit={handleSubmit}>
                    <div className='registro-form'>
                        <input
                            type='text'
                            placeholder='CURP'
                            value={Curp}
                            onChange={(e) => setCurp(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Contraseña'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Nombre'
                            value={Nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Apellido'
                            value={Apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        <input
                            type='email'
                            placeholder='Correo'
                            value={Correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Estado'
                            value={Estado}
                            onChange={(e) => setEstado(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Ciudad'
                            value={Ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Código Postal'
                            value={CodigoPostal}
                            onChange={(e) => setCodigoPostal(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Registrarse</button>
                </form>
                {error && <p className='error-message'>Todos los campos son obligatorios</p>}
            </section>
        </>
    );
}

export default Registro;
