import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { imgdb, textdb } from "../Firebase/Firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

function ImgUploadCard({ showOverlay, setShowOverlay }) {

    return (
        <>
            <div className="flex justify-center items-center mt-4 z-30">
                <div
                    onClick={() => setShowOverlay(true)}
                    className="cursor-pointer border border-neutral-600 w-[100%] bg-green-500 rounded-xl py-3 text-center"
                >
                    Upload File
                </div>
            </div>
            {showOverlay && <Overlay setShowOverlay={setShowOverlay} />}
        </>
    );

}

function Overlay({ setShowOverlay }) {

    const [imgURL, setimgURL] = useState()
    const [name, setname] = useState()
    const [price, setprice] = useState()



    const handleImgInput = async (e) => {
        const file = e.target.files[0];
        const imgsRef = ref(imgdb, `Imgs/${v4()}`);

        try {
            await uploadBytes(imgsRef, file).then(data => {
                getDownloadURL(data.ref).then(val => {
                    setimgURL(val);
                })
            })

        } catch (error) {
            console.error("Error uploading file", error);
        }
    };


    const handleSubmitToFirebase = async (e) => {
        e.preventDefault();
        if (confirm('data is enterd want to upload ?')) {
            const valRef = collection(textdb, 'cardDetals')
            await addDoc(valRef, { imgeurl: imgURL, name: name, price: price })
            setShowOverlay(false)
            setimgURL()
            setname()
            setprice()
        }


    }

    return (
        <div
            className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 z-40 backdrop-blur h-screen w-screen "
        >
            <div className="absolute top-16 flex flex-col justify-center items-center border py-3 px-2 rounded-xl bg-white text-black w-[350px]">
                <div className=' flex w-full justify-end'>
                    <AiOutlineClose className='cursor-pointer text-[20px] ' onClick={() => setShowOverlay(false)} />
                </div>
                <h1 className=" text-lg font-medium">Upload Product</h1>
                <form onSubmit={handleSubmitToFirebase}>
                    <div className=" flex flex-col justify-center items-center">


                        {imgURL ? (

                            <div className="flex flex-col justify-center mt-4">
                                <img src={imgURL} alt="Uploaded Image" className=" h-[250px] object-cover rounded-xl" />
                            </div>
                        ) :
                            <label
                                className="flex-1 cursor-pointer border border-neutral-600 w-[100%] rounded-xl py-10 my-2 text-center"
                            >
                                <input type="file" accept="pdf,jpg,png,HEIC"
                                    onChange={handleImgInput}
                                    className="hidden w-full h-full" />
                                Upload File
                            </label>
                        }



                        <input onChange={(e) => setname(e.target.value)} type="text" required placeholder='Name' className=' m-auto outline-none border text-[18px] border-neutral-700 rounded-xl w-[300px] p-3 my-3 ' />

                        <input onChange={(e) => setprice(e.target.value)} type="number" required placeholder='Price' className='outline-none border text-[18px] border-neutral-700 rounded-xl w-[300px] p-3 my-3 ' step='0.01' />

                        <button className='flex-1 bg-purple-500 rounded-xl py-3 w-full'>Submit</button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default ImgUploadCard;


