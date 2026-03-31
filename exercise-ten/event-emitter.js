import EventEmitter from "events";

class NotificationSystem extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new NotificationSystem();

myEmitter.on("notify", (msg) => {
  console.log(`📢 Message: ${msg}`);
});

myEmitter.on("notify", () => {
  console.log(`🕐 Time: ${new Date().getTime()}`);
});

let numOfNotifications = 0;
myEmitter.on("notify", () => {
  numOfNotifications += 1;
  console.log(`📊 Total notifications: ${numOfNotifications}`);
});
myEmitter.emit("notify", "Welcome!");
myEmitter.emit("notify", "New message!");