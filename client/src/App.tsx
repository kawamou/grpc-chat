import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/outline";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { ChatServiceClient } from "./pb/protobuf/ChatServiceClientPb";
import { CreateMessageRequest, Message } from "./pb/protobuf/chat_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { v4 as uuidv4 } from "uuid";

const useMessagges = (
  client: ChatServiceClient
): [Message[], (newMessage: Message) => void] => {
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const stream = client.getMessageStream(new Empty());
    stream.on("data", (m) => {
      const newMessage = m.getMessage();
      if (!newMessage) {
        return;
      }
      setMessages((current) => {
        return [...(current ?? []), newMessage];
      });
    });
  }, [client]);

  const addMessage = useCallback(
    (newMessage: Message) => {
      const req = new CreateMessageRequest();
      req.setMessage(newMessage);
      client.createMessage(req, null, (res) => {
        console.log(res);
      });
    },
    [client]
  );
  return [messages ?? [], addMessage];
};

type ChatHeaderProps = {
  me: string;
};

const ChatHeader = ({ me }: ChatHeaderProps) => {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <UserIcon className="object-cover w-5 h-5 rounded-full text-gray-600" />
      <span className="block ml-4 font-bold text-gray-600">{me}</span>
      <span className="absolute w-2 h-2 bg-green-600 rounded-full left-7 top-3"></span>
    </div>
  );
};

type ChatMessageProps = {
  key: number;
  from: "me" | "partner";
  content: string;
};

const ChatMessage = ({ key, from, content }: ChatMessageProps) => {
  return (
    <li
      key={key}
      className={`flex ${from === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-xl px-4 py-2 ${
          from === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
        } rounded shadow`}
      >
        <span className="block">{content}</span>
      </div>
    </li>
  );
};

type ChatFormProps = {
  me: string;
  onSubmit: (newMessage: Message) => void;
};

// https://konstantinlebedev.com/solid-in-react/
const ChatForm = ({ me, onSubmit }: ChatFormProps) => {
  const [text, setText] = useState(uuidv4());

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;
    const message = new Message();
    message.setFrom(me);
    message.setMessageContent(text);
    message.setCreatedAt();
    onSubmit(message);
    console.log(message);
    setText("");
  };

  return (
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <button
        onClick={(e) => {
          handleOnSubmit();
        }}
      >
        <ArrowCircleUpIcon className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
};

const client = new ChatServiceClient("http://localhost:9090");

// ref. https://larainfo.com/blogs/tailwind-css-chat-ui-example
const App = () => {
  const [messages, addMessage] = useMessagges(client);
  const [userID] = useState(uuidv4());

  return (
    <div className="App">
      <div className="container mx-auto max-w-3xl">
        <div className="w-full border rounded">
          <div className="w-full">
            <ChatHeader me={userID} />
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                {messages?.map((message, index) => {
                  return (
                    <ChatMessage
                      key={index}
                      from={message.getFrom() === userID ? "me" : "partner"}
                      content={message.getMessageContent()}
                    />
                  );
                })}
              </ul>
            </div>
            <ChatForm me={userID} onSubmit={addMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
