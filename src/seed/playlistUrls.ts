const source =
  "https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls?client_id=lnFbWHXluNwOkW7TxTYUXrrse0qj1C72&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM";
export const x = [
  "https://cf-hls-media.sndcdn.com/playlist/zlobEAQSXVfu.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjc4NDExfX19XX0_&Signature=A8jqFXihm-Ja8FTT36Xixe4ExwYbg7~G8C01pwDz3uRt-S-G2ebVVfFzGD-vdCszALEOQYKhOZ3sZytQtfFJFlY2fwXID6HsJ6BVYxu5Ty3wicA1ESRJ2lXhgTqEvErltLa4qj2Uw9iYl~wSn9j41Fb6GCi70heSLsgAlvHHRzwTGl-gvKKONwoSwqt7c2rBpyb4n0SQlunBfcyYCaYeAlRgpOaf~tiBrJoAehoodrIwe2wm7aMtmvZUFKmtFIZABZBrmGRpeyY9kXNehv3cc~qlvdQHSuQ-TD5YdMB7RQ9tcJBUU-xQbferq5HdH6f33J-c82SS4EhYIfElMUfroQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM",
  "https://cf-hls-media.sndcdn.com/playlist/zlobEAQSXVfu.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjc4NzQ4fX19XX0_&Signature=Flj1qr5pTAx35m5XsWpF0vCjJIwmsmw8FhLb1pPvy4smDDLBdpYuBC5DdX74MhY1K1FGvQWgXeUvFMs35Cb2IZM-DuSGUmtnK4WbXaA39IxC9VtiXb~ouMN8Eb6dscZzEouB7vQTGTEZx3uz44roGiPuORy5vLTg0jOiPoaLTus6Av1gYpqogtUa0C9D09KKs-D9ZYyd2~~6KCeTTQOMI7yp2iwVdPgsug7GOOHFhSCuobJwMzUpJeoDSzKi3~lU4KaHgHASYcVzHG5nKgT3iW49eX-PaAjvyYw66NS2NJKZPlotr21UrcVJX2x5e5hRZbFC-1pWb4hOCov2KHql6g__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM",
];

export const playlistCallPayload = {
  url: "https://cf-hls-media.sndcdn.com/playlist/zlobEAQSXVfu.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3psb2JFQVFTWFZmdS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjgzMDczfX19XX0_&Signature=EFdCzjwm1c2cEmERyXCAlKdufsv7L~YYbZGbQJt5O9Mp0zl~-rIg0-yUO95M-o09Y69rfFMwSnh7fBG6oyXI5PFCSncYXJBusgO2FrBjOW6b36wf-~hHPT~pc5L7LWkXvLEy4eszR7zWIfV3ygTwjdzORvwOBWi-9-FVPyatgceBF9cr9mUYQ2cPTJdvMYT9lNg9bHyc-F9FDG23A8fcQ7HQlDKcNo0tZJZFDo4nq9cGHfCi6shHBuLvuP3rFH9hxvj3uFUypY0e3FGIUEqYukICi2mBm5mgSqapZnseuvvlRTK-LmZaf06FGB~LIufMA6UIQ~poOQshvDdMinfFGA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ&track_authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI3NjY4Nn0.IqnQXjxT8qPyEM6L4A20JLCYDH0OwMu44yrRoJu5rWM",
};