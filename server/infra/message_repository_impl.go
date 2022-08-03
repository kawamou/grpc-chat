package infra

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/kawamou/grpcchat/domain"
)

const (
	messageCollectionName = "message"
)

type MessageRepositoryImpl struct {
	c *FirestoreClient
}

func NewMessageRepositoryImpl(c *FirestoreClient) *MessageRepositoryImpl {
	return &MessageRepositoryImpl{
		c: c,
	}
}

// Add はMessageを永続化する処理です
//  TODO: 自動生成IDがバッティングするとエラーになる
func (m *MessageRepositoryImpl) Add(ctx context.Context, message *domain.Message) error {
	if _, _, err := m.c.c.Collection(messageCollectionName).Add(ctx, message); err != nil {
		return fmt.Errorf("failed to MessageRepositoryImpl.Add: %w", err)
	}
	return nil
}

// Listen はMessageコレクションのリアルタイムアップデートを確認する処理です
//  https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots
func (m *MessageRepositoryImpl) Listen(ctx context.Context, stream chan<- domain.Message) error {
	message := domain.Message{}

	snapIter := m.c.c.Collection(messageCollectionName).Snapshots(ctx)
	defer snapIter.Stop()

	for {
		snap, err := snapIter.Next()
		if err != nil {
			return fmt.Errorf("failed to MessageRepositoryImpl.Listen, snapIter.Next: %s", err)
		}
		log.Printf("change size: %d\n", len(snap.Changes))
		for _, diff := range snap.Changes {
			switch diff.Kind {
			case firestore.DocumentAdded:
				if err := diff.Doc.DataTo(&message); err != nil {
					return fmt.Errorf("failed to MessageRepositoryImpl.Listen: %s", err)
				}
			}
			message.Id = diff.Doc.Ref.ID

			select {
			case <-ctx.Done():
				return nil
			default:
				stream <- message
			}
		}
	}
}
