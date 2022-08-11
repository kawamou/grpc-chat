package usecase

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/kawamou/grpcchat/domain"
)

type CreateMessageService struct {
	messageRepository domain.MessageRepository
}

type CreateMessageServiceInput struct {
	message *domain.Message
}

func NewCreateMessageService(repo domain.MessageRepository) *CreateMessageService {
	return &CreateMessageService{
		messageRepository: repo,
	}
}

func NewCreateMessageServiceInput(name, message string, createdAt time.Time) *CreateMessageServiceInput {
	return &CreateMessageServiceInput{
		message: domain.NewMessage(name, message, createdAt),
	}
}

func (g *CreateMessageService) Handle(ctx context.Context, input *CreateMessageServiceInput) error {
	log.Printf("create message: %#v\n", input.message)
	if err := g.messageRepository.Add(ctx, input.message); err != nil {
		return fmt.Errorf("failed to CreateMessageService.Handle: %w", err)
	}
	return nil
}
