import { server } from "./src/index";

server
  .listen(443, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running!');
  });