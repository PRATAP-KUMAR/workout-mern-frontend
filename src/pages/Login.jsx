import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import ErrorPage from './ErrorPage';
import API from '../../api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    const [loading, setLoading] = useState(null);

    const [Error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    useEffect(() => {
        const checkBackend = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API}/api/test/`);
                const json = await response.json();
                console.log(json.message);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        }
        checkBackend();
    }, [])

    return (
        <>
            {
                loading ? <div>Loading...</div>
                    :
                    Error ? <ErrorPage />
                        :
                        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-start 2xl:flex-row">
                            <div className='flex flex-col items-center justify-center 2xl:w-1/3'>
                                <img
                                    className="w-96"
                                    src="images/Wavy_Gen-01_Single-07.svg"
                                    alt="Login Photo"
                                />
                                <a
                                    className='text-blue-500 text-xs'
                                    target="_blank"
                                    href='https://www.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_12146011.htm#query=login&position=7&from_view=keyword&track=sph&uuid=5f7de01f-1a23-4a2d-9039-04035ff6a96d#page=1&query=l&from_query=undefined&position=0&from_view=keyword&track=sph&uuid=5f7de01f-1a23-4a2d-9039-04035ff6a96d'
                                    rel="noreferrer"
                                >
                                    Image by vectorjuice on Freepik
                                </a>
                            </div>
                            <form onSubmit={handleSubmit} className='flex-1 2xl:min-h-[calc(100vh-4rem)] flex flex-col w-full bg-dark px-12 2xl:w-2/3 space-y-5 items-center justify-center mx-auto'>
                                <h1 className='text-2xl font-bold text-toodark'>Login to Workout Buddy</h1>
                                <input
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Email'
                                    className='w-full h-12 pl-2 focus:ring-1 focus:ring-toodark caret-toodark placeholder-dark'
                                />
                                <input
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder='Password'
                                    className='w-full h-12 pl-2 focus:ring-1 focus:ring-toodark caret-toodark placeholder-dark'
                                />
                                <button disabled={isLoading} className='button'>Login</button>
                                {error && <div className='text-red-500'>{error}</div>}
                            </form>
                        </div >
            }
        </>
    )
}

export default Login;