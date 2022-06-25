import { Types } from "mongoose";

export interface CreateLabelDto {
  // label information //////
  labelName: string;
  displayName: string;
  biography?: string;
  location?: string;
  profilePicture?: string;
  coverPicture?: string;
  country: string;
  //////////////////////////

  // label status ///////////
  approved: boolean;
  enabled: boolean;
  visible: boolean;
  lastStatusUpdate?: Date;
  //////////////////////////

  // staff /////////////////
  admins?: Types.ObjectId;
  editors?: Types.ObjectId;
  artistsSigned?: Types.ObjectId;
  //////////////////////////

  // music ////////////
  releases?: Types.ObjectId;
  tracks?: Types.ObjectId;

  // sales /////////////////
  sales?: Types.ObjectId;
  //////////////////////////

  // content liked /////////
  likedArticles?: Types.ObjectId;
  likedComments?: Types.ObjectId;
  likedReleases?: Types.ObjectId;
  likedTracks?: Types.ObjectId;
  likedArtists?: Types.ObjectId;

  // social ////////////////
  followers?: Types.ObjectId;
  //////////////////////////

  // links /////////////////
  bandcampLink?: string;
  soundcloudLink?: string;
  mixcloudLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  customLink?: string;
  //////////////////////////

  // counts
  articlesLikedCount?: number;
  commentsLikedCount?: number;
  tracksCount?: number;
  releasesCount?: number;
  artistsCount?: number;
  salesCount?: number;
  //////////////////////////

  // dates ////////////
  lastActivity?: Types.ObjectId;
  foundationDate: Date;
  //////////////////////////
}
