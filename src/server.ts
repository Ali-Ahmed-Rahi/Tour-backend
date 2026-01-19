/* eslint-disable no-console */
import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seeSuperAdmin';


let server: Server;


const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL)

    console.log("DB connected SuccessFully ✅");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port${envVars.PORT}🚀`);
    })
  } catch (error) {
    console.log(error);
  }

}

(async () => {
  await startServer()
  await seedSuperAdmin()
})()

// this is for server off efficiently without hesitating
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... server shuting down... ⚙️",);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... server shuting down.. ⚙️", err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on("uncaughtExceptionMonitor", (err) => {
  console.log("Uncaught Exception detected... server shuting down.. ⚙️", err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on("SIGINT", (err) => {
  console.log("SIGINT signal received... server shuting down.. ⚙️", err);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})





