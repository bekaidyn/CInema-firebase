import React, { useState } from 'react';
import Spinner from '../spinner/spinner';
import axios from 'axios'
function LoginAdmin({ onLogin }) {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const user = {
            email,
            password
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(user);

            const res = await axios.post('http://localhost:3001/api/auth/login', body, config);
            const token = res.data
            localStorage.setItem('token', token);
            onLogin(token)
        } catch (err) {
            console.error(err.response.data);
        }
    };

    setTimeout(() => {
        setLoading(false);
    }, 100);

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            '_self'
        );

    };

    return (
        <div className='bg-gray-300  sm:py-0 lg1:py-[4.8%]'>
            {loading ? (
                <Spinner />
            ) : (
                <div className='justify-center flex lg1:flex-row sm:flex-col  lg1:mx-[25%] sm:mx-auto '>
                    <div className='flex flex-col py-[8%] sm:px-[10%] lg1:px-[5%] bg-white'>
                        <h1 className='text-5xl my-5 text-center '>Signin</h1>
                        <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={onChange} required
                            className='py-2 my-1 bg-gray-200 rounded-md border-2 pl-3 sm:w-full lg1:w-[100%] lg:w-250'
                            placeholder='Username' />
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={onChange} required
                            className='py-2 bg-gray-200 my-1 rounded-md border-2 pl-3 sm:w-full lg1:w-[100%] lg:w-250'
                            placeholder='Password' />
                        <button onClick={onSubmit} className='bg-[#0a9d71] text-white my-3 lg:w-250 sm:w-auto py-2 text-center rounded-md'>Signin</button>
                        <div className='pt-2 text-center'>
                            <p>or sign in with </p>
                        </div>
                        <div ><div className="flex justify-around mx-10 mt-5 ">
                            <button className=' mx-1 '>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                    <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                </svg>
                            </button>
                            <button className='mx-1' onClick={googleAuth}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                    <linearGradient id="SK7n3APNjcs6R_Z9A0y6Ca_kkAN3fOocGoh_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f44f5a"></stop><stop offset=".443" stopColor="#ee3d4a"></stop><stop offset="1" stopColor="#e52030"></stop></linearGradient><path fill="url(#SK7n3APNjcs6R_Z9A0y6Ca_kkAN3fOocGoh_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M28.765,21H18v5h5.91c-1.466,2.417-3.225,3-4.91,3c-3.314,0-5-2.967-5-5c0-1.939,2.06-5,5-5	c1.5,0,2.868,0.554,3.92,1.465l3.151-3.106C24.471,15.894,22.728,14,19,14c-4.971,0-10,4.173-10,10c0,4.971,3.995,10,10,10	c6.225,0,10-5.029,10-10C29,22.834,28.765,21,28.765,21z" opacity=".05"></path><path d="M28.265,21.5H18.5v4h5.91c-0.971,2.627-3.082,4-5.41,4c-3.314,0-5.5-2.826-5.5-5.5	c0-2.627,2.373-5.5,5.5-5.5c1.5,0,2.868,0.554,3.92,1.465l2.651-2.606C23.971,15.894,22.034,14.5,19,14.5	c-4.971,0-9.5,4.101-9.5,9.5c0,4.971,4.012,9.5,9.5,9.5c5.598,0,9.5-4.529,9.5-9.5C28.5,22.834,28.265,21.5,28.265,21.5z" opacity=".07"></path><path fill="#fff" d="M27.815,22.2l-0.05-0.2H19v3h5.91c-0.477,2.837-2.938,5-5.91,5c-3.314,0-6-2.686-6-6s2.686-6,6-6	c1.5,0,2.868,0.554,3.92,1.465l2.151-2.106C23.471,15.894,21.34,15,19,15c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9	C28,23.383,27.934,22.782,27.815,22.2z"></path><path d="M38.5,21H37v-1.5c0-0.828-0.672-1.5-1.5-1.5h-1c-0.828,0-1.5,0.672-1.5,1.5V21h-1.5	c-0.828,0-1.5,0.672-1.5,1.5v1c0,0.828,0.672,1.5,1.5,1.5H33v1.5c0,0.828,0.672,1.5,1.5,1.5h1c0.828,0,1.5-0.672,1.5-1.5V25h1.5	c0.828,0,1.5-0.672,1.5-1.5v-1C40,21.672,39.328,21,38.5,21z" opacity=".05"></path><path d="M38.5,21.5h-2v-2c0-0.552-0.448-1-1-1h-1c-0.552,0-1,0.448-1,1v2h-2c-0.552,0-1,0.448-1,1v1	c0,0.552,0.448,1,1,1h2v2c0,0.552,0.448,1,1,1h1c0.552,0,1-0.448,1-1v-2h2c0.552,0,1-0.448,1-1v-1	C39.5,21.948,39.052,21.5,38.5,21.5z" opacity=".07"></path><path fill="#fff" d="M34.5,19h1c0.276,0,0.5,0.224,0.5,0.5v7c0,0.276-0.224,0.5-0.5,0.5h-1c-0.276,0-0.5-0.224-0.5-0.5v-7	C34,19.224,34.224,19,34.5,19z"></path><path fill="#fff" d="M31.5,22h7c0.276,0,0.5,0.224,0.5,0.5v1c0,0.276-0.224,0.5-0.5,0.5h-7c-0.276,0-0.5-0.224-0.5-0.5v-1	C31,22.224,31.224,22,31.5,22z"></path>
                                </svg>
                            </button>
                            <button className=' mx-1 '>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                    <path fill="#0288d1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"></path>
                                </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    {/*----------------------------------------*/}
                    <div className='lg1:block relative bg-gradient-to-b from-[#1dbe98] to-[#0a9d71]  box-border text-white px-[5%] sm:py-20 text-center  pt-[20%] '>
                        <div className=' font-bold text-2xl'>Welcome back!</div>
                        <p className='  '>
                            Welcome back! We are so happy to have you here. It's great to see you again.
                            We hope you had a safe and enjoyable time away.
                        </p>
                        <div className='flex justify-center pt-6'>
                            <button className='bg-[#0a9d71] hover:text-black  hover:bg-white px-2 py-2 rounded-3xl'>
                                No account yet? Signup.
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginAdmin;