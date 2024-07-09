import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const messageModel = model("message", messageSchema);

export default messageModel;
