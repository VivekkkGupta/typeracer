

const App = () => {
  return (
    <div className="bg-black w-full h-screen text-white relative flex flex-col items-center">
      <div className="absolute right-0 p-5 flex flex-col gap-2 text-4xl">
        <div><i className="ri-settings-2-line"></i></div>
        <div><i className="ri-share-line"></i></div>
        <div><i className="ri-information-line"></i></div>
      </div>
      <div className="timer">0</div>
      <div className="restart"><i className="ri-refresh-line fill-white"></i></div>
      <div className="challenge">
      RemixIcon can be resized by CSS class integrated by remixicon.css . Icons inherit the font-size of their parent container and with the following classes, you can increase or decrease the size of icons relative to that inherited font-size. You can also use ri-fw class for a fixed width for icons. For example
      </div>
      <input type="text" placeholder="Enter text Here" />
      <div className="bg-gray-700 rounded-lg w-[200px] p-4 text-xl">
        <div>31 WPM</div>
        <div>Character accuracy</div>
        <div>Word accuracy</div>
        <div>Word list</div>
        <div>Word mode</div>
        <div>Incorrect words</div>
        <div>Time elapsed</div>
      </div>
    </div>
  )
}

export default App;