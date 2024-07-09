import { useEffect, useState } from "react"
import Card from "./Components/Card"
import NavBar from "./Components/NavBar"
import PopUpCard from "./Components/PopUpCard"
import Search from "./Components/Search"
import ImgUploadCard from "./Components/ImgUploadCard"
import { collection, onSnapshot } from "firebase/firestore"
import { textdb } from './Firebase/Firebase';
import RequestHandel from "./Components/RequestHandel"


function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [adminButton, setadminButton] = useState(false)
  const [IwantPopUp, setIwantPopUp] = useState(false)
  const [adminPage, setadminPage] = useState(false)
  const [adminPageCards, setadminPageCards] = useState(true)
  const [adminPageRequest, setadminPageRequest] = useState(false)
  const [MainPage, setMainPage] = useState(true)
  const [firebaseProduct, setfirebaseProduct] = useState([])
  const [filterDataSearch, setfilterDataSearch] = useState([])



  const AdminOn = () => {
    setadminButton(true)
  }

  const AdminOff = () => {
    setadminButton(false)
  }

  const PopUpOnIwant = () => {
    setIwantPopUp(true)
  }


  const AdminPageCardFlip = () => {
    setadminPageCards(true)
    setadminPageRequest(false)
  }

  const AdminPageRequestFlip = () => {
    setadminPageRequest(true)
    setadminPageCards(false)
  }


  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsCollection = collection(textdb, 'cardDetals')
        // const contactsSnapshot = await getDocs(contactsCollection)
        onSnapshot(contactsCollection, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          setfirebaseProduct(contactsList)
          setfilterDataSearch(contactsList)
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

      <div className="relative max-w-[370px] m-auto p-2  ">
        <NavBar AdminOn={AdminOn} adminPage={adminPage} MainPage={MainPage} setMainPage={setMainPage} setadminPage={setadminPage} setadminPageCards={setadminPageCards} />
        <div className=" border-t pt-6 border-neutral-800" >
          <Search firebaseProduct={firebaseProduct} setfilterDataSearch={setfilterDataSearch} filterDataSearch={filterDataSearch} />
        </div>

        {adminPage && (
          <div className=" relative">
            <ImgUploadCard showOverlay={showOverlay} setShowOverlay={setShowOverlay} />

            <div className=" flex justify-around mt-4 ">
              <div
                onClick={AdminPageCardFlip}
                className={`${adminPageCards ? 'bg-purple-500' : 'bg-gray-500'} p-4 border border-neutral-600 w-[48%] text-center rounded-xl cursor-pointer`}>Photos</div>
              <div
                onClick={AdminPageRequestFlip}
                className={`${adminPageRequest ? 'bg-purple-500' : 'bg-gray-500'} p-4 border border-neutral-600 w-[48%] text-center rounded-xl cursor-pointer`}>Request</div>
            </div>

            {adminPageCards && <div className=" flex justify-center">
              <div className="relative flex-col">
                <Card PopUpOnIwant={PopUpOnIwant} IwantPopUp={IwantPopUp} adminPage={adminPage} firebaseProduct={firebaseProduct} filterDataSearch={filterDataSearch} />
              </div>
            </div>}

            {adminPageRequest && <div className=" flex justify-center">
              <div className="relative flex-col">
                <RequestHandel />
              </div>
            </div>}

          </div>
        )}

        {MainPage && <div className=" flex justify-center">
          <div className="relative flex-col">
            <Card PopUpOnIwant={PopUpOnIwant} IwantPopUp={IwantPopUp} firebaseProduct={firebaseProduct} filterDataSearch={filterDataSearch} />
          </div>
        </div>}

        {adminButton && <PopUpCard AdminOff={AdminOff} AdminOn={AdminOn} setadminPage={setadminPage} adminPage={adminPage} adminButton={adminButton} setMainPage={setMainPage} setadminButton={setadminButton} />}


      </div>
    </>
  )
}

export default App