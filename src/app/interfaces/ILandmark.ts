export interface ILandmark {
  objectId: string;
  title: string;
  short_info: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  }
  order: number;
  url: string;
  photo: File|any;
  photo_thumb: File|any;
}
