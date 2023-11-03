import React, { useState } from 'react';
//import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment";
import { Link } from "react-router-dom"

const Write = () => {

    const state = useLocation().state
    //const { quillRef } = useQuill();
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

    const navigate = useNavigate();
    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
    

const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try{
        state ? await axios.put(`/posts/${state.id}`, {
            title,
            desc:value,
            cat,
            img: file ? imgUrl : "",
        }) 
        : await axios.post(`/posts/`, {
            title,
            desc:value,
            cat,img:file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
        navigate("/GenMessageBoard")
    }catch(err) {
        console.log(err)
    }
};
    return (
        <main>
        <div className="dashboard-header">
        <div className="logoHeader">
          <Link to="/GenMessageBoard"><img className="passportIconHeader" src="./logopm1.png"/></Link>
        </div>
            <h1>Write a post</h1>
        </div>

        <div className='add'>
            <div className="imageWrapper">
            <img src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="imageHome"/>
            </div>

            <div className="content">
                <input className="title" value={title} type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    {/*<div style={{ height: 100 }}>
                        <div className="editor" ref={quillRef} value={value} onChange={setValue} />
                    </div> */}
                    <ReactQuill
                        className="editor"
                        placeholder="Whats on your mind..."
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft <br></br>
                    </span>
                    <span>
                        <b>Visibility: </b> Public <br></br>
                    </span> <br></br>
                    <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>

                <div className="item">
                    <h1>Region</h1>
                    <div className="cat">
                    <input type="radio" checked={cat === "africa"} name="cat" value="africa" id="africa" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="africa">Africa</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "asia"} name="cat" value="asia" id="asia" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="asia">Asia</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "europe"} name="cat" value="europe" id="europe" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="europe">Europe</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "oceania"} name="cat" value="oceania" id="oceania" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="oceania">Oceania</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "northamerica"} name="cat" value="northamerica" id="northamerica" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="northamerica">North America</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "southamerica"} name="cat" value="southamerica" id="southamerica" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="southamerica">South America</label>
                    </div>
                </div>
            </div>
        
        </div>
        </main>
    )

}

export default Write