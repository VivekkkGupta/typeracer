import { useState } from "react";

const statement = "RemixIcon can be resized by CSS class integrated by remixicon.css . Icons inherit the font-size of their parent container and with the following classes, you can increase or decrease the size of icons relative to that inherited font-size. You can also use ri-fw class for a fixed width for icons. For example"

const App = () => {

  const [Timer,setTimer] = useState(60);
  return (
    <div className="bg-black w-full h-screen text-white relative flex flex-col justify-around text-5xl overflow-hidden">
      
      <div className="absolute top-5 right-2 p-5 flex flex-col gap-2 text-4xl">
        <div><i className="ri-settings-2-line cursor-pointer"></i></div>
        <div><i className="ri-share-line cursor-pointer"></i></div>
        <div><i className="ri-information-line cursor-pointer"></i></div>
      </div>

      <div className="timer flex items-center justify-center gap-4 w-full">
        <span className="text-gray-400"><i class="ri-subtract-line"></i></span>
        {Timer}
        <span className="text-gray-400"><i class="ri-add-line"></i></span>
        </div>

      <div className="restart flex items-center justify-center w-full"><i className="ri-refresh-line fill-white"></i></div>

      <div>
        <div className="challenge text-left whitespace-nowrap w-full">
          {
            statement.split("").map((item,index)=>(
              <span>{item}</span>
            ))
          }          
        </div>
        <div className="flex justify-end mt-5">
          <input type="text" placeholder="Type Here" className="w-[50%] left-[50%]  placeholder:text-gray-400 bg-black focus:outline-0 outline-0"/>
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full">
        <div className="bg-gray-700 rounded-lg w-[90%] md:w-[50%] lg:w-[30%] p-4 text-xl flex gap-4">
          <div className="text-right">
            <div>WPM</div>
            <div>Character accuracy</div>
            <div>Word accuracy</div>
            <div>Word list</div>
            <div>Word mode</div>
            <div>Incorrect words</div>
            <div>Time elapsed</div>
          </div>
          <div className="align-left">
            <div>0</div>
            <div>0</div>
            <div>0</div>
            <div>0</div>
            <div>0</div>
            <div>0</div>
            <div>Time elapsed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;