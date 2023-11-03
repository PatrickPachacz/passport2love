import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import Menu from "../components/Menu";
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';


const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation()

    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2]

    


    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
        } catch(err) {
            console.log(err);
        }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () =>{
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/GenMessageBoard")
        } catch(err) {
            console.log(err);
        }
        }
        const getText = (html) =>{
            const doc = new DOMParser().parseFromString(html, "text/html")
            return doc.body.textContent
        }

    return (
    <main>
        <div className="dashboard-header">
        <div className="logoHeader">
          <Link to="/GenMessageBoard">Back to message board</Link>
        </div>
            <h1>Post by <span className="currentUser">{post.username}</span></h1>
        </div>

        <div className="single">
            <div className="content">
                <img src={`../upload/${post?.img}`} alt="" />
            <div className="user">
            {post.userImg && <img 
                src={post.userImg} 
                alt="" 
                />}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>

          {/*}  {currentUser.username === post.username && (

             <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                <img src="https://cdn-icons-png.flaticon.com/128/8162/8162966.png" alt="edit"/>
                </Link>
                <img onClick={handleDelete} src="https://t4.ftcdn.net/jpg/05/78/88/71/240_F_578887164_aeG1uIdCErc0013HI7irmHVDQdNcZvcp.jpg" alt="delete" />
             </div>
          )} */}
            
            </div>
            <h1>{post.title}</h1>
            {getText(post.desc)}
            </div>
            
           {/* <Menu cat={post.cat}/> */}
        </div>
    </main>
    );
};

export default Single