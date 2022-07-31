## server
### 実行方法
```sh
docker compose up server db
```
Messageストリームを取得する
```sh
grpcurl -plaintext localhost:8080 chat.v1.ChatService.GetMessageStream
```
Messageを永続化する
```sh
grpcurl -plaintext -d '{"message": {"name": "name", "message": "message", "created_at": "2000-01-01T01:01:01Z"}}' localhost:8080 chat.v1.ChatService.CreateMessage
```