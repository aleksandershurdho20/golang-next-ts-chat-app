package models

import "gorm.io/gorm"

type Messages struct {
	gorm.Model
	ConversationID int    `json:"conversation_id"`
	SenderID        uint   `json:"sender_id" gorm:"index"` // Add index for better performance
	Sender          User   `json:"sender" gorm:"foreignKey:SenderID"`
	ReceiverID      uint   `json:"receiver_id" gorm:"index"` // Add index for better performance
	Receiver        User   `json:"receiver" gorm:"foreignKey:ReceiverID"`
	Message         string `json:"message"`
}

type Conversation struct {
    gorm.Model

    Messages  []Messages `json:"messages" gorm:"foreignKey:ConversationID"`
    Members   []string   `json:"members" gorm:"type:text[]"` 
    DeletedBy []string   `json:"deleted_by" gorm:"type:text[]"` 
}

