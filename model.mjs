// Get the mongoose object
import mongoose from 'mongoose';

//URI
const uri = process.env.MONGODB_URI;

// Prepare to the database images_db in the MongoDB server running locally on port 27017
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
 const imageSchema = mongoose.Schema({
    url: { type: String, required: true },
    theme: { type: String, required: true },
    color: { type: String, required: true },
    mood: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Image = mongoose.model("Image", imageSchema);


/**
 * Retrive images based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */

const findImages = async (filter, projection, limit) => {
    const query = Image.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}


export { findImages };