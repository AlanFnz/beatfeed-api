import debug from "debug";
import { Types } from "mongoose";

import { CreateLabelDto } from "../dto/create.label.dto";
import { PatchLabelDto } from "../dto/patch.label.dto";
import { PutLabelDto } from "../dto/put.label.dto";

import mongooseService from "../../common/services/mongoose.service";

const log: debug.IDebugger = debug("app:labels-dao");

class LabelsDao {
  Schema = mongooseService.getMongoose().Schema;

  labelSchema = new this.Schema({
    // label information //////
    labelName: { type: String, required: true },
    displayName: { type: String, required: true },
    biography: String,
    location: String,
    profilePicture: String,
    coverPicture: String,
    country: {
      type: String,
      default: "AR",
      required: true,
    },
    //////////////////////////

    // label status ///////////
    approved: { type: Boolean, required: true, default: false },
    enabled: { type: Boolean, required: true, default: true },
    visible: { type: Boolean, required: true, default: true },
    lastStatusUpdate: {
      type: Date,
      default: Date.now,
    },
    //////////////////////////

    // staff /////////////////
    admins: [
      {
        type: Types.ObjectId,
        ref: "User", //
      },
    ],
    editors: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    artistsSigned: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    //////////////////////////

    // music /////////////////
    releases: [
      {
        type: Types.ObjectId,
        ref: "Release",
      },
    ],
    tracks: [
      {
        type: Types.ObjectId,
        ref: "Track",
      },
    ],

    // sales /////////////////
    sales: [
      {
        type: Types.ObjectId,
        ref: "Sale", //
      },
    ],
    //////////////////////////

    // content liked /////////
    likedArticles: [
      {
        type: Types.ObjectId,
        ref: "Article",
      },
    ],
    likedComments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    likedReleases: [
      {
        type: Types.ObjectId,
        ref: "Release",
      },
    ],
    likedTracks: [
      {
        type: Types.ObjectId,
        ref: "Track",
      },
    ],
    likedArtists: [
      {
        type: Types.ObjectId,
        ref: "Artist",
      },
    ],

    // social ////////////////
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    //////////////////////////

    // links /////////////////
    bandcampLink: String,
    soundcloudLink: String,
    mixcloudLink: String,
    instagramLink: String,
    twitterLink: String,
    customLink: String,
    //////////////////////////

    // counts
    articlesLikedCount: Number,
    commentsLikedCount: Number,
    tracksCount: Number,
    releasesCount: Number,
    artistsCount: Number,
    salesCount: Number,
    //////////////////////////

    // dates ////////////
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    foundationDate: { type: Date, required: true },
    //////////////////////////
  });

  Label = mongooseService.getMongoose().model("Label", this.labelSchema);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    log("Created new instance of LabelsDao");
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // methods /////////////////

  async addLabel(labelFields: CreateLabelDto) {
    const label = new this.Label({
      ...labelFields,
    });
    await label.save();

    return label;
  }

  async getLabelById(labelId: Types.ObjectId) {
    return this.Label.findById(labelId).exec();
  }

  async getLabels(limit = 25, page = 0) {
    return this.Label.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateLabelById(
    labelId: Types.ObjectId,
    labelFields: PatchLabelDto | PutLabelDto
  ) {
    const existingUser = await this.Label.findOneAndUpdate(
      { _id: labelId },
      { $set: labelFields },
      { new: true }
    ).exec();

    return existingUser;
  }

  async removeLabelById(labelId: Types.ObjectId) {
    return this.Label.deleteOne({ _id: labelId }).exec();
  }
}

export default new LabelsDao();
