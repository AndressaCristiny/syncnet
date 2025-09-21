import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connectToDatabase = async (): Promise<void> => {
  try {
    const dbUri = MONGODB_URI || "";
    await mongoose.connect(dbUri);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
};

export default connectToDatabase;
