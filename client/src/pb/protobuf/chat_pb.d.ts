import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Message extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): Message;

  getMessageContent(): string;
  setMessageContent(value: string): Message;

  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): Message;
  hasCreatedAt(): boolean;
  clearCreatedAt(): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    from: string,
    messageContent: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetMessageStreamResponse extends jspb.Message {
  getMessage(): Message | undefined;
  setMessage(value?: Message): GetMessageStreamResponse;
  hasMessage(): boolean;
  clearMessage(): GetMessageStreamResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessageStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessageStreamResponse): GetMessageStreamResponse.AsObject;
  static serializeBinaryToWriter(message: GetMessageStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessageStreamResponse;
  static deserializeBinaryFromReader(message: GetMessageStreamResponse, reader: jspb.BinaryReader): GetMessageStreamResponse;
}

export namespace GetMessageStreamResponse {
  export type AsObject = {
    message?: Message.AsObject,
  }
}

export class CreateMessageRequest extends jspb.Message {
  getMessage(): Message | undefined;
  setMessage(value?: Message): CreateMessageRequest;
  hasMessage(): boolean;
  clearMessage(): CreateMessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageRequest): CreateMessageRequest.AsObject;
  static serializeBinaryToWriter(message: CreateMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageRequest;
  static deserializeBinaryFromReader(message: CreateMessageRequest, reader: jspb.BinaryReader): CreateMessageRequest;
}

export namespace CreateMessageRequest {
  export type AsObject = {
    message?: Message.AsObject,
  }
}

export class CreateMessageResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): CreateMessageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageResponse): CreateMessageResponse.AsObject;
  static serializeBinaryToWriter(message: CreateMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageResponse;
  static deserializeBinaryFromReader(message: CreateMessageResponse, reader: jspb.BinaryReader): CreateMessageResponse;
}

export namespace CreateMessageResponse {
  export type AsObject = {
    result: string,
  }
}

