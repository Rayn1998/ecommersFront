export default interface IUser {
  name: string;
  email: string;
  password: string;
  favourites: Object[];
  role: string;
  _id: string;
}