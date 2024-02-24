import React from 'react'

const Header: React.FC<{ mapBox: boolean, setMapBox: React.Dispatch<React.SetStateAction<boolean>> }> = ({ mapBox, setMapBox }) => {
    return (
        <div className=" relative px-5 bg-white  my-1 flex justify-between" style={{ zIndex: "9999" }}>
            <div className='group'>
                <img alt="Photo by aldi sigun on Unsplash"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    className=" object-cover rounded-full w-12 h-12 " />

                <span className="absolute flex flex-col gap-2 left-12 top-auto scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                    <p className=' text-cyan-400'>First Name: Emmanuel</p>
                    <p className=' text-cyan-400'>Last Name: Johnson</p>
                    <p>Email: kenzieemma072@gmail.com</p>
                </span>
            </div>


            <button onClick={() => setMapBox(!mapBox)} className='bg-cyan-400 px-5  rounded-lg text-sm font-medium hover:bg-cyan-500 active:bg-sky-700 hover:text-slate-200 transition delay-100 duration-300 ease-in-out'>
                Change to {mapBox ? 'MapBox' : 'Leaflet'}
            </button>
        </div>

    )
}

export default Header