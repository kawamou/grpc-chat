import { UserIcon } from "@heroicons/react/outline";
import { MicrophoneIcon } from "@heroicons/react/outline";

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

const ChatHooter = () => {
  return (
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
      </button>

      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
      />
      <button>
        <MicrophoneIcon className="w-5 h-5 text-gray-600" />
      </button>
      <button type="submit">
        <svg
          className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
};

// ref. https://larainfo.com/blogs/tailwind-css-chat-ui-example
const App = () => {
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
            <ChatHooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
