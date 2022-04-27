import debug from "debug";
import { Types } from "mongoose";

import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

import mongooseService from "../../common/services/mongoose.service";

const log: debug.IDebugger = debug("app:users-dao");

class FeatureFlagsDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema({
    name: { type: String, required: true },
    version: { type: String, required: true },
    minimumAppVersion: { type: String, required: true },
    enabledIOS: { type: Boolean, required: true },
    enabledAndroid: { type: Boolean, required: true },
    enabledWeb: { type: Boolean, required: true },
    permissionFlags: { type: Number }, // TODO: we may want to add a default value
  });

  Feature = mongooseService.getMongoose().model("Feature", this.userSchema);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    log("Created new instance of FeatureFlagsDao");
  }

  // methods /////////////////

  async addFeature(featureFields: CreateUserDto) {
    return await new this.Feature(featureFields);
  }

  async getFeatureById(featureId: Types.ObjectId) {
    return this.Feature.findById(featureId).exec();
  }

  async getFeatures(limit = 25, page = 0) {
    return this.Feature.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateFeatureById(
    userId: Types.ObjectId,
    featureFields: PatchUserDto | PutUserDto
  ) {
    const existingFeature = await this.Feature.findOneAndUpdate(
      { _id: userId },
      { $set: featureFields },
      { new: true }
    ).exec();

    return existingFeature;
  }

  async removeFeatureById(featureId: Types.ObjectId) {
    return this.Feature.deleteOne({ _id: featureId }).exec();
  }
}

export default new FeatureFlagsDao();
