import {
  useCallback,
  useEffect,
  EffectCallback,
  DependencyList,
  useRef,
} from "react";
import { useState } from "react";
import { CreateMessageRequest, Message } from "../pb/protobuf/chat_pb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { Client } from "../gRPCClient";

export const useMessages = (
  client: Client
): [Message[], (newMessage: Message) => void] => {
  const [messages, setMessages] = useState<Message[]>();

  useDidUpdateEffect(() => {
    const stream = client.client.getMessageStream(new Empty());
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
      client.client.createMessage(req, null, (res) => {
        console.log(res);
      });
    },
    [client]
  );
  return [messages ?? [], addMessage];
};

// 初回は実行されないuseEffectのカスタムフックを作る
// こちらを導入しないとgetMessagesStreamが複数回呼ばれてメッセージが重複する
// ref. https://zenn.dev/catnose99/scraps/30c623ba72d6b5
const useDidUpdateEffect = (fn: EffectCallback, deps: DependencyList) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      fn();
    }
  }, deps);
};
