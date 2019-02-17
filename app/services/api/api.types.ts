import { GeneralApiProblem } from "./api-problem"

export interface User {
  email: string
  firstName: string
  id: number
  lastName: string
  phoneNum: number
}

export interface Bike {
  available: boolean
  id: number
  latitude: number
  longitude: number
  user_id: number
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type CreateUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type UpdateUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type DeleteUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type CreateBikeResult = { kind: "ok"; bike: Bike } | GeneralApiProblem
export type GetBikesResult = { kind: "ok"; bikes: Bike[] } | GeneralApiProblem
export type GetBikeResult = { kind: "ok"; bike: Bike } | GeneralApiProblem
export type GetAvailBikesResult = { kind: "ok"; bikes: Bike[] } | GeneralApiProblem
export type UpdateBikeResult = { kind: "ok"; bike: Bike } | GeneralApiProblem
