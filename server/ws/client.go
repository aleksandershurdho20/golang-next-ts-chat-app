package ws

import "github.com/gorilla/websocket"

// Client struct presenting a connected client with a WebSocket connection (conn) and a channel (send)
//for sending messages.
type Client struct{
	conn *websocket.Conn
	send chan [] byte

}


// reads messages from the WebSocket connection and broadcasts them to the hub.
func (c *Client) ReadMessage(hub * Hub){
	// Defer a cleanup function to unregister the client from the hub and close its WebSocket connection.
	defer func() {
		hub.unregister <- c // Signal to unregister the client from the hub.
		c.conn.Close()      // Close the WebSocket connection.
	}()

	
	for {
		_,message,err :=c.conn.ReadMessage()

		if err!= nil{
			break
		}
		hub.broadcast <- message
	}
}


// writes messages from the client's send channel to the WebSocket connection.
func (c*Client) WriteMessage(){
	defer func (){
		c.conn.Close()
	}()

	for {

	// If the channel is closed (!ok), it means the client has been unregistered, so it sends a WebSocket close message and returns, ending the goroutine.
	// If a message is available on the send channel, it writes the message to the client's WebSocket connection.
		select{
		case message,ok := <-c.send:
			if !ok{
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			c.conn.WriteMessage(websocket.TextMessage, message)

		}
	}
}
