const MONGOOSE = require("mongoose");

// Save a reference to the Schema constructor
const Schema = MONGOOSE.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const HeadlineSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  added: {
    type: Boolean,
    required: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
const HEADLINE = MONGOOSE.model("Headline", HeadlineSchema);

// Export the Article model
module.exports = HEADLINE;
