import { createServer } from './src/createServer';
import { connect } from './src/utils/db';

createServer().listen(443, () => {
  console.log('Server is running!');
  connect();
});
