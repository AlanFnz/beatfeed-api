import { Types } from "mongoose";

export interface CreateUserDto {
  // user information //////
  email: string;
  password: string;
  username: string;
  profilePicture: string;
  coverPicture: string;
  permissionFlags?: number;
  //////////////////////////

  // user status ///////////
  enabled: boolean;
  lastStatusUpdate?: Date;
  //////////////////////////

  // personal information //
  firstName?: string;
  lastName?: string;
  birthDate: Date;
  location?: string;
  country: string;
  //////////////////////////

  // links /////////////////
  instagramLink?: string;
  soundcloudLink?: string;
  twitterLink?: string;
  customLink?: string;
  //////////////////////////

  // content saved /////////
  savedEvents?: Types.ObjectId;
  savedArticles?: Types.ObjectId;
  // counts
  eventsSavedCount?: number;
  articlesSavedCount?: number;
  //////////////////////////

  // content liked /////////
  likedEvents?: Types.ObjectId;
  likedArticles?: Types.ObjectId;
  likedComments?: Types.ObjectId;
  // counts
  eventsLikedCount?: number;
  articlesLikedCount?: number;
  commentsLikedCount?: number;
  //////////////////////////

  // social ////////////////
  following?: Types.ObjectId;
  followers?: Types.ObjectId;
  //////////////////////////

  // auth dates ////////////
  signupDate?: Date;
  lastLogin?: Date;
  //////////////////////////

  // others ////////////////
  globalNotifications?: Types.ObjectId;
  reports?: Types.ObjectId;
  //////////////////////////
}
