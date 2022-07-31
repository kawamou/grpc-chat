package domain

import "context"

type MessageRepository interface {
	Add(ctx context.Context, message *Message) error
	Listen(ctx context.Context, c chan<- Message) error
}
