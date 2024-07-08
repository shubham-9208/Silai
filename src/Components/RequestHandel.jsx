import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteModel from './EditDeleteModel'
import { collection, onSnapshot } from 'firebase/firestore'
import { textdb } from '../Firebase/Firebase'
import { FaRegCopy } from "react-icons/fa6";

function RequestHandel() {
    const [request, setRequest] = useState([])
    const [editDelete, seteditDelete] = useState(null)
    const [copied, setCopied] = useState({})


    const DeleteEditModelPopUp = (productId) => {
        seteditDelete(productId)
    }

    useEffect(() => {
        const getContacts = async () => {
            try {
                const contactsCollection = collection(textdb, 'cardRequest')
                // const contactsSnapshot = await getDocs(contactsCollection)
                onSnapshot(contactsCollection, (snapshot) => {
                    const contactsList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    setRequest(contactsList)
                    return contactsList
                })

            } catch (error) {
                console.log('error');
            }
        }
        getContacts()

    }, [])
    return (
        <>
            {request.map((req) =>

                <div key={req.id} style={{ backgroundColor: "rgba(41, 39, 39, 0.178) " }}
                    className=' relative rounded-xl border border-gray-700 px-2 py-2 h-[370px] w-[330px] overflow-hidden cursor-pointer my-8  shadow-[0_0_10px_rgb(255,255,255,0.2)]'>
                    <img src={req.imgeurlReq} alt="photo" className=' rounded-xl h-[70%]  w-[100%] object-cover bg-black ' />

                    <BsThreeDotsVertical
                        onClick={() => DeleteEditModelPopUp(req.id)}
                        className="absolute top-3 right-3 text-[18px] hover:scale-110 duration-150 cursor-pointer" />

                    {editDelete === req.id && <EditDeleteModel DeleteEditModelPopUp={DeleteEditModelPopUp} req={req} />}

                    <h1 className=' py-2 text-2xl  font-bold text-slate-400 '>{req.name}</h1>
                    <div className=' flex justify-between items-center'>
                    <p>{req.number}</p>
                    <FaRegCopy 
                    className={copied[req.id] ? 'text-green-500' : ''}
                    onClick={() => {
                                navigator.clipboard.writeText(req.number);
                                setCopied({ ...copied, [req.id]: true })
                            }}/>
                    </div>
                </div>

            )}
        </>
    )
}

export default RequestHandel