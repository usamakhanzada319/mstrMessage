import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("all ready connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {}); // or options bi hoty hn phrny hn

    connection.isConnected = db.connections[0].readyState; //readyState ek aary aaye gi{multipal connection sopport krta h }
    console.log("DB is connected successfully");
  } catch (error) {
    console.log("DB connection Failed", error);

    process.exit(1); //jb connect na ho to process ko grace fully exit karo{risky in next js trhow new error krna bather h } is sy pura server bad hojata h
  }
}

export default dbConnect;
