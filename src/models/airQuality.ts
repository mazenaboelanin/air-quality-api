import mongoose, { Schema, Document, Model } from "mongoose";


interface Pollution {
  ts: Date;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

export interface AirQuality extends Document {
  city: string;
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  pollution: Pollution;
  createdAt: Date;
  updatedAt: Date;
}

const AirQualitySchema: Schema = new Schema(
    {
      city: { type: String, required: true},
      state: { type: String, required: true},
      country: { type: String, required: true},

      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },

      pollution: {
        ts: { type: Date, required: true },
        aqius: { type: Number, required: true },
        mainus: { type: String, required: true },
        aqicn: { type: Number, required: true },
        maincn: { type: String, required: true }
      }
    },
    { timestamps: true }
  );

const AirQuality: Model<AirQuality> = mongoose.model<AirQuality>("AirQuality", AirQualitySchema);

export default AirQuality;