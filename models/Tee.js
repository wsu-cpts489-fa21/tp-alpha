import mongoose from 'mongoose';

const TeeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    golfingYardage: {type: Number, required: true},
    runningYardage: {type: Number, required: false},
    numHoles: {type: Number, required: false},
    timeParMultiplier: {type: Number, required: false, default: 70}
  },
  {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true
    } 
  });
  
  TeeSchema.virtual('timePars').get(function() {
    return (this.timeParMultiplier * this.runningYardage);
  });

const Tee = mongoose.model("Tee",TeeSchema);
export {TeeSchema, Tee};