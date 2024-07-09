import messageModel from "../../../db/models/message.model.js";
import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../../utils/classError.js";
import { asyncHandler } from "../../../utils/globalErrorHandler.js";

//create message

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, reciverEmail } = req.body;
  const resiver = await userModel.findOne({ email: reciverEmail,confirmed:true });
  if (!resiver) {
    return next(new AppError("failed to send!,reciver email don't exist!", 409));
  }
  if(resiver.email == req.user.email){
    return next(new AppError("can't send message!", 409))
  }
  const message = await messageModel.create({
    content,
    receiverId: resiver.id,
    
  });
  return res.status(200).json({ msg: "done", message });
})

//read messages

export const readMessages = asyncHandler(async (req, res, next) => {
  const messages = await messageModel.find({ receiverId: req.user.id }).select("content");

  return res.status(200).json({ msg: "done", messages });
});

//delete message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await messageModel.findOneAndDelete(
    { _id: id, receiverId: req.user.id },
    { new: true }
  );
  if (!message) {
    next(new AppError("message not exist or you are not authorized!", 409));
  }
  return res.status(200).json({ msg: "done", message });
});
