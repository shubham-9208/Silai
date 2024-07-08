import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { textdb } from "../Firebase/Firebase";


function Popupforpeopel({ popPeopelImg, setpop }) {

    const [name, setname] = useState('')
    const [number, setnumber] = useState(+91)
    const [imgesofRequest, setimgesofRequest] = useState('')

    const handleSubmitToFirebase = async (e) => {
        e.preventDefault();
        if (confirm('data is enterd want to upload ?')) {
            const valRef = collection(textdb, 'cardRequest')
            await addDoc(valRef, { imgeurlReq: imgesofRequest, name: name, number: number })
            setimgesofRequest()
            setname()
            setnumber()
            setpop(false)
        }
    }

    const handleWhatsAppMessage = async () => {
        const message = `Image Request from shubham: res`;
        const whatsappUrl = `https://wa.me/${import.meta.env.VITE_NUM}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };


    return (
        <>
            {popPeopelImg.map((p) =>

                <div key={p.id} className=' absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 z-40 backdrop-blur h-full w-full'>
                    <div className=' absolute top-16 flex flex-col justify-center items-center border p-3 rounded-xl bg-white text-black  w-[90%]'>
                        <div className=" flex justify-end w-full text-[20px] pb-2"><AiOutlineClose onClick={() => setpop(false)} /></div>
                        <form onSubmit={handleSubmitToFirebase}>
                            
                            <img src={p.imgeurl}
                                onLoad={(e) => setimgesofRequest(e.target.src)}
                                alt="" className=' h-[250px] rounded-xl  w-[100%] object-cover bg-black ' />
                        

                            <input type="text" required placeholder='Name'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                className='text-[16px] my-2 border outline-none border-gray-400 py-3 px-3 rounded-xl w-full' />

                            <input
                                type="tel"
                                pattern="[0-9]{10,15}"
                                value={number}
                                onChange={(e) => setnumber(e.target.value)}
                                maxLength='12'
                                required
                                placeholder='Phone Number'
                                className="text-[16px] my-2 border outline-none border-gray-400 py-3 px-3 rounded-xl w-full" />

                            <button className='flex-1 bg-purple-500 rounded-xl py-3 w-full'> submit</button>
                        </form>
                        <button
                            onClick={handleWhatsAppMessage}
                            className='my-2 flex-1 bg-green-500 rounded-xl py-3 w-full'
                        >
                            Whatsapp
                        </button>


                    </div>
                </div>
            )}
        </>

    )
}

export default Popupforpeopel