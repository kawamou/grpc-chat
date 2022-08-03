package domain

import "time"

type Message struct {
	Id             string `firestore:"-"`
	From           string
	MessageContent string
	CreatedAt      time.Time
}

type Messages []Message

func NewMessage(from, messageContent string, createdAt time.Time) *Message {
	return &Message{
		From:           from,
		MessageContent: messageContent,
		CreatedAt:      createdAt,
	}
}
