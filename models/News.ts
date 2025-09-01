import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["All", "Politic", "Sports", "Education", "Games"],
  },
  headline: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/globe.svg",
    },
  },
  content: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
NewsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
