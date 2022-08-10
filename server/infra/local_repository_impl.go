package infra

import (
	"context"
	"log"

	"github.com/kawamou/grpcchat/domain"
)

var localMessages []domain.Message

type LocalMessageRepositoryImpl struct{}

func NewLocalMessageRepositoryImpl() *LocalMessageRepositoryImpl {
	return &LocalMessageRepositoryImpl{}
}

// Add ...
func (m *LocalMessageRepositoryImpl) Add(ctx context.Context, message *domain.Message) error {
	localMessages = append(localMessages, *message)
	return nil
}

// Listen ...
func (m *LocalMessageRepositoryImpl) Listen(ctx context.Context, stream chan<- domain.Message) error {
	currentLocalMessagesLen := len(localMessages)
	for {
		select {
		case <-ctx.Done():
			return nil
		default:
			if currentLocalMessagesLen < len(localMessages) {
				log.Printf("localMessages size: %d\n", len(localMessages))
				stream <- localMessages[len(localMessages)-1]
				currentLocalMessagesLen = len(localMessages)
			}
		}
	}
}
