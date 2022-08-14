#!/usr/bin/env node
"use strict";

const amqp = require("amqplib");
const express = require("express");
const port = process.env.PORT || 3003;
const chalk = require("chalk");

const app = express();
app.use(express.json());
app.get("/status", async (req, res) => {
  res.status(200).send({
    status: "ok",
    date: new Date(),
  });
});

app.post("/", async (req, res) => {
  try {
    const amqParams = req.body;
    //const result = await callWSIO(amqParams);
    publisher(amqParams).catch((error) => {
      console.error(error);
      process.exit(1);
    });
    res.status(201).send({
      response: { message: "done" },
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({
      response:
        "OMG（/｡＼) An internal server error has been thrown! Look at the console for more information",
    });
  }
});

app.listen(port, "localhost", () => {
  console.log(`Thanks for use Rest2AMQ `);
  console.log(`Rest2AMQ service listen on http://localhost:${port}`);
});

async function publisher({
  server,
  exchangeName,
  exchangeType,
  routingKey,
  message,
}) {
  const connection = await amqp.connect(server);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, exchangeType);

  const sent = channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    {
      // persistent: true
    }
  );

  const time = chalk.cyan(`[${new Date().toISOString()}]`);

  if (sent) {
    console.log(
      `${time} ✈️ Sent message to "${exchangeName}" exchange`,
      JSON.stringify(message)
    );
  } else {
    console.log(
      `${time} 🚨 Fails sending message to "${exchangeName}" exchange`,
      JSON.stringify(message)
    );
  }

  setTimeout(() => {
    connection.close();
    console.log("connection closed");
  }, 500);
}
