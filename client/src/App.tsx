import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/outline";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { ChatServiceClient } from "./pb/protobuf/ChatServiceClientPb";
import { CreateMessageRequest, Message } from "./pb/protobuf/chat_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

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
      console.log(messages);
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

const ChatHeader = () => {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <UserIcon className="object-cover w-5 h-5 rounded-full text-gray-600" />
      <span className="block ml-4 font-bold text-gray-600">anonymous</span>
      <span className="absolute w-2 h-2 bg-green-600 rounded-full left-7 top-3"></span>
    </div>
  );
};

type ChatMessageProps = {
  from: "me" | "partner";
  content: string;
};

const ChatMessage = ({ from, content }: ChatMessageProps) => {
  return (
    <li className={`flex ${from === "me" ? "justify-end" : "justify-start"}`}>
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

type ChatHooterProps = {
  addMessage: (newMessage: Message) => void;
};

const ChatHooter = ({ addMessage }: ChatHooterProps) => {
  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;
    const message = new Message();
    message.setFrom("me");
    message.setMessageContent(text);
    message.setCreatedAt();
    addMessage(message);
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

  return (
    <div className="App">
      <div className="container mx-auto max-w-3xl">
        <div className="w-full border rounded">
          <div className="w-full">
            <ChatHeader />
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <ul className="space-y-2">
                <ChatMessage from="me" content="Hi" />
                <ChatMessage from="me" content="Hiiii" />
                <ChatMessage
                  from="me"
                  content="how are you?how are you?how are you?how are you?how are you?"
                />
                <ChatMessage
                  from="partner"
                  content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                />
              </ul>
            </div>
            <ChatHooter addMessage={addMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
