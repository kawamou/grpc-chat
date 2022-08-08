/**
 * @fileoverview gRPC-Web generated client stub for chat.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as protobuf_chat_pb from '../protobuf/chat_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class ChatServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetMessageStream = new grpcWeb.MethodDescriptor(
    '/chat.v1.ChatService/GetMessageStream',
    grpcWeb.MethodType.SERVER_STREAMING,
    google_protobuf_empty_pb.Empty,
    protobuf_chat_pb.GetMessageStreamResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    protobuf_chat_pb.GetMessageStreamResponse.deserializeBinary
  );

  getMessageStream(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/chat.v1.ChatService/GetMessageStream',
      request,
      metadata || {},
      this.methodInfoGetMessageStream);
  }

  methodInfoCreateMessage = new grpcWeb.MethodDescriptor(
    '/chat.v1.ChatService/CreateMessage',
    grpcWeb.MethodType.UNARY,
    protobuf_chat_pb.CreateMessageRequest,
    protobuf_chat_pb.CreateMessageResponse,
    (request: protobuf_chat_pb.CreateMessageRequest) => {
      return request.serializeBinary();
    },
    protobuf_chat_pb.CreateMessageResponse.deserializeBinary
  );

  createMessage(
    request: protobuf_chat_pb.CreateMessageRequest,
    metadata: grpcWeb.Metadata | null): Promise<protobuf_chat_pb.CreateMessageResponse>;

  createMessage(
    request: protobuf_chat_pb.CreateMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: protobuf_chat_pb.CreateMessageResponse) => void): grpcWeb.ClientReadableStream<protobuf_chat_pb.CreateMessageResponse>;

  createMessage(
    request: protobuf_chat_pb.CreateMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: protobuf_chat_pb.CreateMessageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/chat.v1.ChatService/CreateMessage',
        request,
        metadata || {},
        this.methodInfoCreateMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/chat.v1.ChatService/CreateMessage',
    request,
    metadata || {},
    this.methodInfoCreateMessage);
  }

}

