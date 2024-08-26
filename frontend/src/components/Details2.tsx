

function Details2() {
  return (
    <div >
      <div className="h-[10vw] w-[20vw] ">
        <img src="logo1.jpg" className="h-full w-full"/>
      </div>
      <div>
        Just One Step More
      </div>
        <form className=" ml-20" method="post" action="/api/v1/interview_room" encType="multipart/form-data" >
            <div>
                <div>Enter Post</div>
                <select>
                  <option>ab</option>
                  <option>cd</option>
                </select>  
            </div>
            <div>
              <div>Enter Image</div>
              <input type="file"/>
            </div>
            <div>
              <div>Upload resume</div>
              <input type="file"/>
            </div>
            <div>
              <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Details2;