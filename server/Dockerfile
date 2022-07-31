FROM golang:1.18-alpine as dev
WORKDIR /go/src/app
RUN apk add --no-cache alpine-sdk git
RUN go install github.com/cosmtrek/air@v1.27.4

FROM golang:1.18-alpine as builder
WORKDIR /go/src/app
COPY . .
RUN CGO_ENABLED=0 go build-o go/bin/app

# https://github.com/GoogleContainerTools/distroless#examples-with-docker
FROM gcr.io/distroless/static-debian11
COPY --from=builder /go/bin/app /
CMD ["/app"]
