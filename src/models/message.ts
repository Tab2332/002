import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: [true, '收信人不能为空'],
    trim: true,
    minlength: [2, '收信人姓名至少需要2个字符'],
    maxlength: [50, '收信人姓名不能超过50个字符'],
  },
  content: {
    type: String,
    required: [true, '留言内容不能为空'],
    trim: true,
    maxlength: [1000, '留言内容不能超过1000个字符'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema); 