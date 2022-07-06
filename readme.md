![](assets/header.png)

# Easy Rest2Postman

## Use postman to send rabbit messages

#### Use cases

1. Use postman for AMQ test automation
2. Share and document Rabbit events using postman
3. Testing and development

## How to install?

- Clone this repo
- Run `npm install`
- Run `node .`

A new express service will start in the port 3003 `http://localhost:3003`

### Sending messages to rabbit

**URL** localhost:3003
**METHOD** POST
**BODY** Example

```json
{
  "server": "amqp://guest:guest@localhost:5672",
  "exchangeName": "<<Exchange name>>",
  "exchangeType": "direct",
  "routingKey": "<<routing key>>",
  "message": {
    <<JSON PAYLOAD>>
  }
}
```

## Stay in touch

- Author - Luis Arias 2022 <<ariassd@gmail.com>>
  [GitHub profile](https://github.com/ariassd)

## License

This software is licensed under [MIT License](LICENSE)

![](assets/MIT.png) ![](assets/open-source.png)

July 2022
