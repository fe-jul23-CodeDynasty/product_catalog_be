import { createServer } from './createServer';
import { connect } from './utils/db';

createServer().listen(443, () => {
  console.log('Server is running!');
  connect();
});
