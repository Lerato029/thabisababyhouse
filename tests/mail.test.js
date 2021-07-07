//============================Server Route Unit Test
//http module for creating mock server
import http from "http"
//fetch from the server side
import fetch from "isomorphic-unfetch"
//module for creating mock port
import listen from "test-listen"

import { apiResolver } from "next/dist/next-server/server/api-utils"

//testing the mailList module that adds users to the mailing list
import { mailList } from "../pages/api/subscribe/index"


describe("Prevents user from not entering email ", () => {
  test("responds with status 400 when user doesn't enter email on request", async () => {
    //request route
    let requestHandler = (req, res) => {
      //pass body aka email as null
      req.body = null
      return apiResolver(req, res, undefined, mailList)
    }
    let server = http.createServer(requestHandler)
    //add port to server
    let url = await listen(server)

    //server-side fetch request to test route
    let response = await fetch(url)

    //great error is returned and close mock server
    expect(response.status).toBe(400)
    return server.close()
  })
})