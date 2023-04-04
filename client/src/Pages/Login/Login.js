import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swall from 'sweetalert2';
import { UserContext } from '../../App';
import { recoverToken, savedToken } from '../../utils/Data';
import './login.styles.css';

const Login = () => {
    const {authenticated,setAuthenticated} = useContext(UserContext);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
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
        const data =  {
            email:email,
            password:password
        }

        await fetch('http://localhost:4000/users/login',{
                body: JSON.stringify(data),
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                }).then( async (response) => {
                    let data = await response.json();
                    if (response.status === 200) {
                        savedToken(data);
                        setAuthenticated(recoverToken());
                        Swall.fire({
                            icon: 'success',
                            text: 'Usuario logeado correctamente',
                            timer: 2000
                        })  
                        navigate('/');  
                        return           
                    }
                    Swall.fire({
                        icon: 'error',
                        text: 'Hubo un error al loguearse',
                        timer: 2000
                    })  

                })
                .catch(err => console.log(err));
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
                        <input type="submit" value='Ingresar' className='bottom-register' />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;