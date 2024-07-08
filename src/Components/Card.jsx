
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import EditDeleteModel from "./EditDeleteModel";
import { useState } from "react";
import Popupforpeopel from "./Popupforpeopel";

function Card({ adminPage, filterDataSearch }) {

    const [photoScale, setphotoScale] = useState({});
    const [editDelete, seteditDelete] = useState(null)
    const [pop, setpop] = useState(false)
    const [popPeopelImg, setpopPeopelImg] = useState([])

    const pophandel = (product) => {
        setpop(true)
        window.scrollTo({ top: 220, behavior: 'smooth' });
        const left = filterDataSearch.filter((data) =>
            data.id.includes(product.id)
        )
        setpopPeopelImg(left)
    }

    const DeleteEditModelPopUp = (productId) => {
        seteditDelete(productId)
    }

    const ScallingPhoto = (product) => {
        setphotoScale((prevScale) => ({ ...prevScale, [product.id]: !prevScale[product.id] }));
    };


    return (
        <>

            {filterDataSearch.map((product) => (
                <div key={product.id}>
                    <div style={{ backgroundColor: "rgba(41, 39, 39, 0.178) " }}
                        className=' relative rounded-xl border border-gray-700 px-2 py-2 h-[400px] w-[330px] overflow-hidden cursor-pointer my-8  shadow-[0_0_10px_rgb(255,255,255,0.2)]'>


                        <img src={product.imgeurl} alt="" className=' rounded-xl h-[50%]  w-[100%] object-cover bg-black ' />

                        {adminPage ? <BsThreeDotsVertical
                            onClick={() => DeleteEditModelPopUp(product.id)}
                            className="absolute top-3 right-3 text-[18px] hover:scale-110 duration-150 cursor-pointer" /> :

                            <BiFullscreen
                                onClick={() => ScallingPhoto(product)}
                                className=" absolute top-3 right-3 text-[18px] hover:scale-110 duration-150 cursor-pointer" />}



                        {photoScale[product.id] && (
                            <div
                                onClick={ScallingPhoto}
                                className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 z-40 backdrop-blur h-full w-full"
                            >
                                <img
                                    src={product.imgeurl}
                                    onClick={() => setphotoScale((prevScale) => ({ ...prevScale, [product.id]: false }))}
                                    alt=""
                                    className="w-full h-[100%] object-cover rounded-xl"
                                />
                            </div>
                        )}


                        {editDelete === product.id && <EditDeleteModel DeleteEditModelPopUp={DeleteEditModelPopUp} product={product} />}

                        <p className='  text-[14px] mt-2 text-slate-500 '>Name</p>
                        <h1 className=' py-2 text-2xl  font-bold text-slate-400 '>{product.name}</h1>
                        <p>price: <span>{product.price}</span>Rs.</p>
                        <div className=" flex justify-between items-center mt-6">
                            {!adminPage && <button
                                onClick={() => pophandel(product)}
                                className=' m-4 px-8 bg-blue-500 py-2 rounded-xl'>
                                I Want this
                            </button>}

                        </div>

                    </div>
                    {pop && <Popupforpeopel popPeopelImg={popPeopelImg} setpop={setpop} />}


                </div>
            ))}



        </>
    )
}

export default Card