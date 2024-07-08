

function NavBar({ AdminOn, adminPage, MainPage, setMainPage, setadminPage,setadminPageCards }) {

    const ReturntoMainPage = () => {
        if (confirm('Want to back to Main Page ?')) {
            setMainPage(true)
            setadminPage(false)
            
        }
    }

    return (
        <nav className=" flex items-center justify-between gap-4 mt-2 mb-5">
            <div className=" w-[90%] flex justify-center">

                <h1 className=" text-[32px] ml-10 font-bold">{adminPage ? 'Admin' : "Siali"}</h1>
            </div>
            {MainPage && <button
                onClick={MainPage ? AdminOn : undefined}
                // onClick={makeAdminPageOn}
                className=' px-4 py-2 rounded-xl bg-purple-500 '>A</button>}
            {adminPage && <button
                onClick={adminPage ? ReturntoMainPage : undefined}
                // onClick={makeAdminPageOn}
                className='px-4 py-2 rounded-xl bg-purple-500'>M</button>}
        </nav>
    )
}

export default NavBar