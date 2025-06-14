export default function LowerHalf(){
    return(
        <section className="w-full h-full font-montserrat bg-white p-10">
            <div className="max-w-7xl flex flex-col justify-center items-center gap-10 mx-auto px-4">
                <div className="flex justify-center gap-1 flex-col items-center">
                    <h2 className="text-black text-2xl">How Vetayo helps you</h2>
                    <p className="text-[16px] font-[400] text-black  ">Built to bring your lost items back—smart, secure, and stress-free.</p>
                </div>


                <div className="flex w-full gap-5 justify-around items-stretch">
                    <div className="flex gap-3 flex-col justify-center items-center rounded-[10px] border-r-2 border-b-2 shadow-md  border-gray-300 p-8 w-[450px] min-h-[300px]">
                        
                        <img src="./src/assets/sheets of documents.png" className="w-[150px] max-h-[150px]" alt="" />
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-2xl font-[400]">Report a Lost or Found Item</p>
                            <p className="text-black text-[.75rem] font-[100]">Add detailed info like where you lost or found it, item type, and description.The more details you give, the smarter Vetayo's algorithm becomes at matching items quickly and accurately.</p>                            
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 justify-center items-center border-r-2 border-b-2 shadow-md  border-gray-300 rounded-[10px] p-8 w-[450px]  min-h-[322px]">

                        
                        <img src="./src/assets/Verifying Personal Information with ID Card.png" className="w-[200px] max-h-[150px]" alt="" />
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-start text-2xl font-[400]">Prove Ownership</p>
                            <p className="text-black text-[.75rem] font-[100]">Once we find a match, confirm it's yours through simple verification.Answer a quick security question (like color, sticker, or unique marks) to prove it's your item before pickup.</p>                            
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 justify-center items-center border-r-2 border-b-2 shadow-md border-gray-300 rounded-[10px] p-8 w-[450px]  min-h-[300px]">      
                        
                        <img src="./src/assets/Business deal sealed with handshake.png" className="w-[150px] max-h-[150px]" alt="" />
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-2xl font-[400]">Report a Lost or Found Item</p>

                            <p className="text-black text-[.75rem] font-[100]">Once verified, Vetayo sends you the pickup info or delivery instructions.Just show your match reference, and your item is back in your hands—no stress, no hassle.</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}