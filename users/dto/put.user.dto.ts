import { Types } from "mongoose";

export interface PutUserDto {
  // user information //////
  email: { type: String; required: true };
  password: { type: String; select: false; required: true };
  username: { type: String; required: true };
  permissionFlags: Number;
  //////////////////////////

  // personal information //
  firstName: String;
  lastName: String;
  dateOfBirth: { type: Date; requird: true };
  location: String;
  country: {
    type: String;
    default: "AR";
    required: true;
  };
  //////////////////////////

  // links /////////////////
  instagramLink: String;
  soundcloudLink: String;
  twitterLink: String;
  customLink: String;
  //////////////////////////

  // content saved /////////
  savedEvents: [
    {
      type: Types.ObjectId;
      ref: "Article";
    }
  ];
  savedArticles: [
    {
      type: Types.ObjectId;
      ref: "Article";
    }
  ];
  // counts
  eventsSavedCount: Number;
  articlesSavedCount: Number;
  //////////////////////////

  // content liked /////////
  likedEvents: [
    {
      type: Types.ObjectId;
      ref: "Article";
    }
  ];
  likedArticles: [
    {
      type: Types.ObjectId;
      ref: "Article";
    }
  ];
  likedComments: [
    {
      type: Types.ObjectId;
      ref: "Article";
    }
  ];
  // counts
  eventsLikedCount: Number;
  articlesLikedCount: Number;
  commentsLikedCount: Number;
  //////////////////////////

  // social ////////////////
  following: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];
  followers: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];
  //////////////////////////

  // auth dates ////////////
  signupDate: {
    type: Date;
  };
  lastLogin: {
    type: Date;
  };
  //////////////////////////

  // others ////////////////
  globalNotifications: [
    {
      type: Types.ObjectId;
      ref: "GlobalNotification";
    }
  ];
  reports: [
    {
      type: Types.ObjectId;
      ref: "Report";
    }
  ];
  //////////////////////////
}
