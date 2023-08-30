import React, { useEffect, useState } from 'react'
import axios from 'axios'
const chat = () => {
    const [chats, setChats] = useState([]);
    const fetchChats = async () => {
        const { data } = await axios.get('/api/chat');
        setChats(data);
    }

    // runs when component is rendered for 1st time
    useEffect(() => {
        fetchChats();
    }, [])

    return (
        <div>
            {chats.map(chat => (
                <div>{chat.chatName}</div>
            ))}
        </div>
    )
}

export default chat
