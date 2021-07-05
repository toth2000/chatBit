import React, {useState, useEffect} from 'react';
import queryString from 'query-string'; //For retriving data from Url
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({location}) => { 

    //State of component
    const [name, setName] = useState(''); 
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'https://toth2000-chat-bit.herokuapp.com/';

    /**This hook handle new connection and disconnection*/
    useEffect(()=>{ //It is a reactHook, its equivalent is componentDidMount and componentDidUpdate
        const {name, room} = queryString.parse(location.search) //location.search returns URL from ? and parser parse data

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        console.log(`name: ${name} and room: ${room}`);
        socket.emit('join', {name, room}); //Sending data to backend
        
        return ()=>{  //It is call when unmounting component
             socket.emit('disconnect');
             socket.off(); //Turn the instance of client socket off
        }

    }, [ENDPOINT, location.search]); //useEffect() will be called when value of array element changes


    /**This hook handle messages  */
    useEffect(()=>{ //With hooks we can have many useEffect
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event)=>{
        event.preventDefault();
        /**The above event prevent react from refreshing the whole page for a key press event */

        if(message)
        {
            console.log('Message in Client', message);
            socket.emit('sendMessage', message, (err)=> setMessage(''));
        }
    }

    console.log(message, messages);

    return ( 
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;

