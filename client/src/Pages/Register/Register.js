import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swall from 'sweetalert2';
import { UserContext } from '../../App';
import './register.styles.css';

const Register = () => {
    const {authenticated} = useContext(UserContext);
    const navigate = useNavigate();

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username === '' || email === '' || password === '') {
            Swall.fire({
                icon: 'error',
                text: 'Todos los campos son requeridos',   
                timer: 2000
            })
        return
        }
        if (password.length <= 6) {
            Swall.fire({
                icon: 'error',
                text:'La contraseña debes tener un minimo de 6 caracteres',
                timer:2000
            })
            return
        }
        if (password !== repeatPassword) {
            Swall.fire({
                icon: 'error',
                text: 'Los password no coinciden',
                timer: 2000
            })
            return
        }
        const data =  {
            username:username,
            email:email,
            password:password}

        await fetch('http://localhost:4000/users/register',{
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                }).then((response) => {
                    console.log(response.status);
                    if (response.status === 201) {
                        Swall.fire({
                            icon: 'success',
                            text: 'Usuario creado correctamente',
                            footer:'<a href="/login"> Ir a iniciar session </a>'
                        })
                    }
                    if (response.status === 500) {
                        Swall.fire({
                            icon: 'error',
                            text: 'Existe el email en la base de datos',
                            })
                    }
                })
                .catch(err => {
                Swall.fire({
                    icon: 'error',
                    text: 'Hubo un error en la base de datos',
                    })
                });
    }
    if (authenticated !== null) {
        navigate('/');
    }

    return (
        <section className='register'>
            <div className='register-img'></div>
            <div className='register-formulario'>
                <form className='formulario' onSubmit={handleSubmit}>
                    <div className="formulario-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text"
                         placeholder='Ingresar username'
                          id='username'
                          name='username'
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          />
                    </div>
                    <div className="formulario-group">
                        <label htmlFor="email">email</label>
                        <input 
                        type="text" 
                        placeholder='Ingresar email' 
                        id='email' 
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="formulario-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                        type="password" 
                        placeholder='Ingresar contraseña' 
                        id='password' 
                        name='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="formulario-group">
                        <label htmlFor="repeat-password">Repetir Contraseña</label>
                        <input 
                        type="password" 
                        placeholder='Ingresar contraseña' 
                        id='repeat-password' 
                        name='repeat-password' 
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <div className="formulario-group">
                        <input type="submit" value='Registrarme' className='bottom-register' />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register;