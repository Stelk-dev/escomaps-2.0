import React, { useRef, useState } from 'react'
import img from '../../assets/escomaps_logo.png';

export default function SignupAdvertiser() {
    const [data, setData] = useState({
        email: '',
        password: '',
        acceptTOS: false,
    });

    const [showData, setshowData] = useState(false);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh'}}>
            <img src={img} width={320}style={{objectFit: 'contain'}} alt='escort_logo' />
            <div style={{height: 64}}/>

            {/* Forms */}
            <input placeholder='email' value={data.email} onChange={v => setData({...data, email: v.target.value})}/>
            <input placeholder='password' value={data.password} onChange={v => setData({...data, password: v.target.value})}/>
            <br />
            
            {/* TOS */}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label>
                    <input
                        type="checkbox"
                        checked={data.acceptTOS}
                        onChange={() => setData({...data, acceptTOS: !data.acceptTOS})}
                    />
                    Accetti termini e condizioni
                </label>
            </div>
            <br />
            
            <button onClick={() => setshowData(true)}>
                Registrati
            </button>

            {
                showData ? (
                <div>
                    <p>{data.email}</p>
                    <p>{data.password}</p>
                    <p>Accept: {data.acceptTOS.toString()}</p>
                </div>
                ) : <></>
            }
        </div>
    );
}