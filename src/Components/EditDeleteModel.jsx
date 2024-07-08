import { deleteDoc, doc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { imgdb, textdb } from "../Firebase/Firebase";
import { deleteObject, ref } from "firebase/storage";




function EditDeleteModel({ DeleteEditModelPopUp, product, req }) {



  const Todelete = async (product) => {
    if (confirm('Want to delete ?')) {
      try {
        await deleteDoc(doc(textdb, 'cardDetals', product.id));
        const url = new URL(product.imgeurl);
        const filePath = decodeURIComponent(url.pathname.split('/').pop());
        const imageRef = ref(imgdb, `/${filePath}`);
        await deleteObject(imageRef);

      } catch (error) {
        console.log(error);
      }
    }
  }

  const TodeleteReq = async (req) => {
    if (confirm('Want to delete ?')) {
      try {
        await deleteDoc(doc(textdb, 'cardRequest', req.id));

      } catch (error) {
        console.log(error);
      }
    }
  }



  return (
    <>



      <div className=' absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 z-40 h-full w-full'>
        <div className=' absolute bg-white text-black top-8 right-6 py-2 px-6 text-[18px] rounded-xl'>
          <div className=' flex justify-center text-[25px]'><RxCross2 onClick={DeleteEditModelPopUp} /></div>
          {req ? <div onClick={() => TodeleteReq(req)} className=" my-2">Delete</div> :
            <div onClick={() => Todelete(product)} className=" my-2">Delete</div>
          }
        </div>
      </div>

    </>
  )
}

export default EditDeleteModel