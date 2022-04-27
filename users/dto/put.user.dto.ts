import { Types } from "mongoose";

export interface PutUserDto {
  // user information //////
  email: string;
  password: string;
  username: string;
  permissionFlags: number;
  //////////////////////////

  // personal information //
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  location: string;
  country: string;
  //////////////////////////

  // links /////////////////
  instagramLink: string;
  soundcloudLink: string;
  twitterLink: string;
  customLink: string;
  //////////////////////////

  // content saved /////////
  savedEvents: Types.ObjectId;
  savedArticles: Types.ObjectId;
  // counts
  eventsSavedCount: number;
  articlesSavedCount: number;
  //////////////////////////

  // content liked /////////
  likedEvents: Types.ObjectId;
  likedArticles: Types.ObjectId;
  likedComments: Types.ObjectId;
  // counts
  eventsLikedCount: number;
  articlesLikedCount: number;
  commentsLikedCount: number;
  //////////////////////////

  // social ////////////////
  following: Types.ObjectId;
  followers: Types.ObjectId;
  //////////////////////////

  // auth dates ////////////
  signupDate: Date;
  lastLogin: Date;
  //////////////////////////

  // others ////////////////
  globalNotifications: Types.ObjectId;
  reports: Types.ObjectId;
  //////////////////////////
}
