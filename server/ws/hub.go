package ws

// Hub represents the central hub that manages connected clients and message broadcasting.

type Hub struct{
	clients map[*Client]bool // keep track of connected clients
	broadcast chan []byte // channel for broadcasting messages to all clients
	register chan *Client // channel for registering new clients
	unregister chan *Client // chanel for unregistering clients
}


//Creates and return a new instace of hub
func NewHub() * Hub {
	return &Hub{
		clients: make(map[*Client]bool),
		broadcast: make(chan [] byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}
// run starts the main loop of the hub in go routine, handling client registration, unregistration, and message broadcasting.

func (hub * Hub) Run(){
	for{
		select{
			case client:= <-hub.register:
			hub.clients[client]=true
			case client:= <-hub.unregister:
			// Unregister a client
			
			if _,ok:=hub.clients[client];ok{
				delete(hub.clients,client)
				close(client.send)
			}

		case message:= <-hub.broadcast:
		// Broadcast a message to all connected clients

		for client:= range hub.clients{
			// When a message is broadcasted, it sends the message to all connected clients through their respective send channels
			// If a client's send channel is unavailable, it closes the channel and removes the client from the map.
			select{
			case client.send <- message:
			default:
				// If unable to send, close the client's send channel and remove it from the map
				close(client.send)
				delete(hub.clients, client)
			}
		}

			
			

		}
	}
}