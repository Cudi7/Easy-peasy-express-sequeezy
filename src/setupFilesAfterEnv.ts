import { client } from './db';

global.afterAll(async () => {
  await client.close();
});

// THIS FILE WILL AVOID THIS WARNING WHEN EXECUTING TESTS:
// A worker process has failed to exit gracefully and has been force exited.
// This is likely caused by tests leaking due to improper teardown.
// Try running with --detectOpenHandles to find leaks.
// Active timers can also cause this, ensure that .unref() was called on them.
