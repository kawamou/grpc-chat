package main

import (
	"context"
	"log"

	"github.com/kawamou/grpcchat/domain"
	pb "github.com/kawamou/grpcchat/pb"
	"github.com/kawamou/grpcchat/usecase"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Server ...
// https://zenn.dev/hsaki/books/golang-grpc-starting/viewer/server#%E8%87%AA%E4%BD%9C%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E6%A7%8B%E9%80%A0%E4%BD%93%E3%81%AE%E5%AE%9A%E7%BE%A9
type Server struct {
	pb.UnimplementedChatServiceServer
	usecase.CreateMessageService
	usecase.GetMessageStreamService
}

func NewServer(createMessageService usecase.CreateMessageService, getMessageStreamService usecase.GetMessageStreamService) *Server {
	return &Server{
		CreateMessageService:    createMessageService,
		GetMessageStreamService: getMessageStreamService,
	}
}

func (s *Server) GetMessageStream(req *emptypb.Empty, server pb.ChatService_GetMessageStreamServer) error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	stream := make(chan domain.Message)

	go func() {
		if err := s.GetMessageStreamService.Handle(ctx, stream); err != nil {
			log.Println(err)
		}
	}()

	for {
		v := <-stream
		createdAt := timestamppb.New(v.CreatedAt)
		if err := server.Send(&pb.GetMessageStreamResponse{
			Message: &pb.Message{
				From:           v.From,
				MessageContent: v.MessageContent,
				CreatedAt:      createdAt,
			},
		}); err != nil {
			return err
		}
	}
}

func (s *Server) CreateMessage(ctx context.Context, req *pb.CreateMessageRequest) (*pb.CreateMessageResponse, error) {
	input := usecase.NewCreateMessageServiceInput(req.Message.From, req.Message.MessageContent, req.Message.CreatedAt.AsTime())
	if err := s.CreateMessageService.Handle(ctx, input); err != nil {
		return &pb.CreateMessageResponse{
			Result: err.Error(),
		}, err
	}
	return &pb.CreateMessageResponse{
		Result: "ok",
	}, nil
}
