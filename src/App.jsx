import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

const initFormValue = { username: '', password: '' }

export default function App() {
    const [registerValue, setRegisterValue] = useState(initFormValue);
    const [loginValue, setLoginValue] = useState(initFormValue);
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: registerValue.username, password: registerValue.password})
        })
        setRegisterResponse(await res.json())
        setRegisterValue(initFormValue)
    };

    const login = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loginValue.username, password: loginValue.password})
        });
        const result = await res.json();

        localStorage.setItem('jwt', result.token);
        setLoginResponse(`${localStorage.getItem('jwt')}`)
        setLoginValue(initFormValue)
    };






    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleRegisterFormChange = (e) => {
        const { value, name } = e.target;

        setRegisterValue({
            ...registerValue,
            [name]: value
        });
    }

    const handleLoginFormChange = (e) => {
        const { value, name } = e.target;

        setLoginValue({
            ...loginValue,
            [name]: value
        });
    }

    return (
        <div className="App">

            <h1>Register</h1>
            <button onClick={() => {console.log(registerResponse)}}>test</button>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={registerValue.username}
                        handleChange={handleRegisterFormChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={registerValue.password}
                        handleChange={handleRegisterFormChange}
                    />
                ]}
            />

            {registerResponse && <p>Thank you for registering {registerResponse.user.username}!</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={loginValue.username}
                        handleChange={handleLoginFormChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={loginValue.password}
                        handleChange={handleLoginFormChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
