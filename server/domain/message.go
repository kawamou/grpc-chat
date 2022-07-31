package domain

import "time"

type Message struct {
	Name      string
	Message   string
	CreatedAt time.Time
}

type Messages []Message

func NewMessage(name, message string, createdAt time.Time) *Message {
	return &Message{
		Name:      name,
		Message:   message,
		CreatedAt: createdAt,
	}
}
