import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getBikes(): Promise<Types.GetBikesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/bike/`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertBike = raw => {
      return {
        id: raw.id,
        longitude: raw.longitude,
        latitude: raw.latitude,
        available: raw.available,
        user_id: raw.user_id
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawBikes = response.data
      const resultBikes: Types.Bike[] = rawBikes.map(convertBike)
      return { kind: "ok", bikes: resultBikes }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getAvailBikes(): Promise<Types.GetAvailBikesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/bike/avail/1`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertBike = raw => {
      return {
        id: raw.id,
        longitude: raw.longitude,
        latitude: raw.latitude,
        available: raw.available,
        user_id: raw.user_id
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawBikes = response.data
      const resultBikes: Types.Bike[] = rawBikes.map(convertBike)
      return { kind: "ok", bikes: resultBikes }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async getBike(id: number): Promise<Types.GetBikeResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/bike/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultBike: Types.Bike = {
        id: response.data.id,
        longitude: response.data.longitude,
        latitude: response.data.latitude,
        user_id: response.data.user_id,
        available: response.data.available,
      }
      return { kind: "ok", bike: resultBike }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async createBike(longitude: number, latitude: number): Promise<Types.CreateBikeResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/bike/`, { longitude: longitude, latitude: latitude })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultBike: Types.Bike = {
        id: response.data.id,
        longitude: response.data.longitude,
        latitude: response.data.latitude,
        user_id: response.data.user_id,
        available: response.data.available,
      }
      return { kind: "ok", bike: resultBike }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async updateBike(longitude: number, latitude: number, user_id: number, available: boolean, id: number): Promise<Types.UpdateBikeResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(`/bike/${id}`,
      {
        available: available,
        latitude: latitude,
        longitude: longitude,
        user_id: user_id
      }
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const resultBike: Types.Bike = {
        id: response.data.id,
        longitude: response.data.longitude,
        latitude: response.data.latitude,
        user_id: response.data.user_id,
        available: response.data.available,
      }
      return { kind: "ok", bike: resultBike }
    } catch {
      return { kind: "bad-data" }
    }
  }


  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/user/`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        firstName: raw.firstName,
        lastName: raw.lastName,
        phoneNum: raw.phoneNum,
        email: raw.email
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async createUser(fname: string, lname: string, email: string, pnum: number): Promise<Types.CreateUserResult> {
    const response: ApiResponse<any> = await this.apisauce.post('/user/', {
      email: email,
      firstName: fname,
      lastName: lname,
      phoneNum: pnum,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) { return problem }
    }

    try {
      const resultUser: Types.User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNum: response.data.phoneNum,
        email: response.data.email,
      }
      return { kind: 'ok', user: resultUser }
    } catch{
      return { kind: "bad-data" }
    }
  }
  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/user/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNum: response.data.phoneNum,
        email: response.data.email,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
  async updateUser(id: number, fname: string, lname: string, email: string, pnum: number): Promise<Types.UpdateUserResult> {
    const response: ApiResponse<any> = await this.apisauce.put('/user/', {
      id: id,
      email: email,
      firstName: fname,
      lastName: lname,
      phoneNum: pnum,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) { return problem }
    }

    try {
      const resultUser: Types.User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNum: response.data.phoneNum,
        email: response.data.email,
      }
      return { kind: 'ok', user: resultUser }
    } catch{
      return { kind: "bad-data" }
    }
  }
  async deleteUser(id: number): Promise<Types.DeleteUserResult> {
    const response: ApiResponse<any> = await this.apisauce.delete(`/user/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNum: response.data.phoneNum,
        email: response.data.email,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
