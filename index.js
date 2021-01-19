const express = require("express")
const request = require("sync-request")
const app = new express()


app.get("/", (req, res) => {
  const api = request("GET", "https://jsonplaceholder.typicode.com/posts").getBody().toString()
  const posts = JSON.parse(api)
  res.send(`<h1>pagina di post</h1>
 <ul>
 ${posts.map((e => {
    return `
   <h3>${e.userId}</h3>
   <a href="/posts/${e.id}">${e.id}</a>
   <h6>${e.title}</h6>
   <p>${e.body}</p>
   
    `
  }))}
 </ul>`
  )
})
app.get("/posts/:id", function(req, res) {
  const api2 = request("GET", "https://jsonplaceholder.typicode.com/post/" + req.params.id + "/comments").getBody().toString()
  const comms = JSON.parse(api2)
  res.send(`<h1>pagina di commenti al post ${req.params.id} </h1>
  <ul>
  ${comms.map((e => {
    return `
    <li>${e.postId}</li>
    <p>${e.id}</p>
    <p>${e.name}</p>
    <p>${e.email}</p>
    <p>${e.body}</p>
    `

  }))}
  </ul>`)
})


// eslint-disable-next-line no-console
app.listen(3000, () => console.log("server listening on port 3000"))
