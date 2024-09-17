import sha256 from 'crypto-js/sha256'; // Import sha256 from crypto-js
import React, { useEffect, useState } from 'react';
import IndianFlag from '../Images/flag.jpg';
import OtpRecv from '../Images/otpRec.png';
import SendOtp from '../Images/sendOtp.jpg';

const OtpApi = () => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(180); // Set timer to 3 minutes (180 seconds)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [txnId, setTxnId] = useState(''); // Store txnId for OTP verification
  const [hashedOtp, setHashedOtp] = useState(''); // Store hashed OTP

  // Handle countdown timer for OTP resend
  useEffect(() => {
    let countdown;
    if (isTimerActive && timer > 0) {
      countdown = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(countdown);
  }, [timer, isTimerActive]);

  // Handle OTP input change and hash it
  const handleOtpChange = (e) => {
    const enteredOtp = e.target.value;
    setOtp(enteredOtp);

    // Hash the OTP using sha256
    const hash = sha256(enteredOtp).toString();
    console.log(hash);
    setHashedOtp(hash);  // Store the hashed OTP
  };

  // Send OTP function
  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.txnId) {
          setOtpSent(true);
          setTxnId(data.txnId); // Store transaction ID for verification
          setIsTimerActive(true);
          setTimer(180); // Reset the timer to 3 minutes
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to send OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        setErrorMessage('An error occurred while sending OTP.');
      });
  };

  // OTP verification function
  const verifyOtp = () => {
    if (!otp) {
      setErrorMessage('Please enter the OTP.');
      return;
    }

    // Call API to verify OTP with hashed value
    fetch('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: hashedOtp, // Send the hashed OTP
        txnId,          // Transaction ID
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setOtpVerified(true);
          setErrorMessage('');
          console.log('OTP verified successfully! Token:', data.token);
          // You can store the token in local storage or use it for further API calls
        } else {
          setErrorMessage('Incorrect OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        setErrorMessage('An error occurred during OTP verification.');
      });
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center md:bg-blue-500 bg-white'>
      {!otpSent && (
        <div className='md:w-1/4 w-full h-full flex flex-col pt-5 items-center md:h-3/4 bg-white rounded-3xl shadow-xl shadow-slate-900'>
          <img className='w-2/3 shadow-xl bg-blue-500 shadow-blue-400 rounded-full' src={SendOtp} alt="Send OTP" />
          <div className='font-medium mt-5'>Verify Your Mobile Number</div>
          <div className='w-3/4 h-10 flex flex-row mt-3 space-x-1'>
            <div className='w-1/12 h-full flex justify-center items-center'>
              <img src={IndianFlag} alt="Indian Flag" />
            </div>
            <div className='w-full h-full'>
              <input
                className='h-full w-full text-center'
                placeholder='Enter your mobile number...'
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className='mt-3 w-2/3 h-10 bg-green-500 flex justify-center items-center rounded-3xl active:bg-green-600 active:scale-95 shadow-md shadow-green-800 duration-300'>
            <button className='w-full h-full rounded-3xl font-medium' onClick={sendOtp}>
              Send OTP
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}
        </div>
      )}

      {otpSent && !otpVerified && (
        <div className='md:w-1/4 w-full h-full flex flex-col pt-5 items-center md:h-3/4 bg-white rounded-3xl shadow-xl shadow-slate-900'>
          <img className='w-2/3 shadow-xl shadow-blue-400 rounded-full' src={OtpRecv} alt="Receive OTP" />
          <div className='font-medium mt-5'>Enter OTP sent to your mobile</div>
          <div className='w-3/4 h-10 flex flex-row mt-3 space-x-1'>
            <div className='w-full h-full'>
              <input
                className='h-full w-full text-center'
                placeholder='Enter OTP...'
                type="text"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
          </div>
          <div className='mt-3 w-2/3 h-10 bg-green-500 flex justify-center items-center rounded-3xl active:bg-green-600 active:scale-95 shadow-md shadow-green-800 duration-300'>
            <button className='w-full h-full rounded-3xl font-medium' onClick={verifyOtp}>
              Verify
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          {isTimerActive && (
            <p className='mt-2 text-blue-500'>You can resend OTP in {timer} seconds.</p>
          )}
        </div>
      )}

      {otpVerified && (
        <div className='text-center text-green-600 font-bold'>
          OTP Verified Successfully!
        </div>
      )}
    </div>
  );
};

export default OtpApi;
