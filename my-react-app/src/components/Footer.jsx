export default function Footer(){
    return(
        <footer className="w-screen pl-20 pr-20 pb-10 pt-10 bg-[#476930] ">
            <div>
                <div className="flex justify-start items-center gap-5 pb-5 border-b-1 border-white ">
                    <p className="w-[70px] h-[60px] text-5xl bg-white rounded-[10px] text-black flex justify-center items-center">
                        V
                    </p>                    
                    <p className="text-4xl text-white">Vetayo!</p>
                </div>
                <div className="flex justify-between mt-5">

                    <p className="text-white">Vetayo is a smart lost and found platform that helps you quickly report, track, and recover lost items</p>
                    <div className="flex gap-5 ">
                        <img src="../src/assets/Icon.png" alt="" /><img src="src\assets\Link (1).png" alt="" /><img src="src\assets\Link (2).png" alt="" /><img src="src\assets\Link (3).png" alt="" /><img src="my-react-app\src\assets\Link.png" alt="" />

                    </div>
                </div>
            <div className="flex w-full mt-20">
            {/* Left Side */}
                <div className="w-1/2 pr-4">
                    <p className="text-white text-[.65rem]">© 2025 NUR Medspa & Wellness. All rights reserved.</p>
                    <p className="text-white text-[.65rem]">Designed and Developed by: House of Flairs</p>
                </div>

                {/* Right Side */}
                <div className="w-1/2 flex justify-between pl-4 text-white text-sm font-light">
                    <div>
                        <p className="font-semibold mb-2 text-white text-[.95rem]">Quick Links</p>
                        <a href="#" className="block text-white text-[.75rem] font-light">Home</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">About Us</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Report</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Lost Item</a>
                    </div>

                    <div>
                        <p className="font-semibold mb-2 text-white text-[.95rem]">Terms</p>
                        <a href="#" className="block text-white text-[.75rem] font-light">Faqs</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Documents</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Policy</a>
                    </div>

                    <div>
                        <p className="font-semibold mb-2 text-[.95rem] text-white">Contact Us</p>
                        <a href="#" className="block text-white text-[.75rem] font-light">01-4333333</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Vetayocare@gmail.com</a>
                        <a href="#" className="block text-white text-[.75rem] font-light">Kathmandu, Nepal</a>
                    </div> 
                </div>

            </div>

            </div>
        </footer>
    )
}