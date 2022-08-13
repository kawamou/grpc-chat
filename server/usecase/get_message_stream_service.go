package usecase

import (
	"context"
	"fmt"

	"github.com/kawamou/grpcchat/domain"
	"golang.org/x/sync/errgroup"
)

type GetMessageStreamService struct {
	messageRepository domain.MessageRepository
}

func NewGetMessageStreamService(repo domain.MessageRepository) *GetMessageStreamService {
	return &GetMessageStreamService{
		messageRepository: repo,
	}
}

func (g *GetMessageStreamService) Handle(ctx context.Context, stream chan<- domain.Message) error {
	defer close(stream)
	eg, _ := errgroup.WithContext(ctx)
	eg.Go(func() error {
		if err := g.messageRepository.Listen(ctx, stream); err != nil {
			return err
		}
		return nil
	})
	if err := eg.Wait(); err != nil {
		return fmt.Errorf("failed to GetMessageStreamService.Handle: %s", err)
	}
	return nil
}
