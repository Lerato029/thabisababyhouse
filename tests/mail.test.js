// **pages/api/__tests__/home.test.js**

import http from "http"
import fetch from "isomorphic-unfetch"
import listen from "test-listen"
import { apiResolver } from "next/dist/next-server/server/api-utils"
import { mailList } from "../pages/api/subscribe/index"

describe("Prevents user from not entering email ", () => {
  test("responds with status 400 when user doesn't enter email on request", async () => {
   
    let requestHandler = (req, res) => {
      req.body = null
      return apiResolver(req, res, undefined, mailList)
    }
    let server = http.createServer(requestHandler)
    let url = await listen(server)
    let response = await fetch(url)
    expect(response.status).toBe(400)
    return server.close()
  })
})