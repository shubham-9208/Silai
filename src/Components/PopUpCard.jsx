
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";


function PopUpCard({ AdminOff, PopUpOffIwant, IwantPopUp, setadminPage, adminButton, setMainPage, setadminButton }) {

    const [userName, setuserName] = useState('')
    const [passWord, setpassWord] = useState('')
    const [error, seterror] = useState('')


    const handleLogin = (e) => {
        e.preventDefault();
        const adminUsername = import.meta.env.VITE_USERNAME;
        const adminPassword = import.meta.env.VITE_PASSWORD;

        if (userName === adminUsername && passWord === adminPassword) {
            setadminPage(true)
            setMainPage(false)
            setadminButton(false)
            setuserName()
            setpassWord()
        } else {
            seterror('Invalid Username or Password')
        }

    }



    return (
        <div className=' absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 z-40 backdrop-blur h-full w-full'>
            <div className=' absolute top-16 flex flex-col justify-center items-center border p-3 rounded-xl bg-white text-black w-[80%]'>
                <div className=' flex w-full justify-end'>
                    <AiOutlineClose className='cursor-pointer text-[20px]' onClick={AdminOff || PopUpOffIwant} />
                </div>

                <h1 className='text-[16px] font-medium mb-2'>Admin Login </h1>
                <form onSubmit={handleLogin}>



                    {adminButton && <input type="text" required placeholder='Admin Name' className='text-[16px] my-2 border outline-none border-gray-400 py-3 px-3 rounded-xl w-full' value={userName}
                        onChange={(e) => setuserName(e.target.value)} />}

                    <input type="password"
                        value={passWord}
                        onChange={(e) => setpassWord(e.target.value)}
                        required
                        placeholder="password"
                        autoComplete="username"
                        className='text-[16px] my-2 border outline-none border-gray-400 py-3 px-3 rounded-xl w-full' />


                    <button className='flex-1 bg-purple-500 rounded-xl py-3 w-full'> Login</button>

                    <div>{error}</div>


                </form>
            </div>
        </div>
    )
}

export default PopUpCard