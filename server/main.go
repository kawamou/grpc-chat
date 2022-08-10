package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/kawamou/grpcchat/infra"
	pb "github.com/kawamou/grpcchat/pb"
	"github.com/kawamou/grpcchat/usecase"
)

const (
	port = 8080
)

func init() {}

// main ...
// https://zenn.dev/hsaki/books/golang-grpc-starting/viewer/server#%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%92%E8%B5%B7%E5%8B%95%E3%81%99%E3%82%8B%E9%83%A8%E5%88%86%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E6%9B%B8%E3%81%8F
func main() {
	ctx := context.Background()

	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		panic(err)
	}

	s := grpc.NewServer()

	register(ctx, s)

	// https://zenn.dev/hsaki/books/golang-grpc-starting/viewer/server#%5B%E3%82%B3%E3%83%A9%E3%83%A0%5D%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AA%E3%83%95%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%A8%E3%81%AF%EF%BC%9F
	reflection.Register(s)

	go func() {
		log.Printf("start gRPC server, port: %d", port)
		s.Serve(listener)
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("stopping gRPC server...")
	s.GracefulStop()
}

func register(ctx context.Context, s *grpc.Server) {
	// c := infra.NewFirestoreClient(ctx)
	// repo := infra.NewMessageRepositoryImpl(c)
	repo := infra.NewLocalMessageRepositoryImpl()
	createMessageService := usecase.NewCreateMessageService(repo)
	getMessageService := usecase.NewGetMessageStreamService(repo)
	pb.RegisterChatServiceServer(s, NewServer(*createMessageService, *getMessageService))
}
