import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  //   res.json({ msg: "Hellow words" })
  res.send("Hello from Express")
})

//readmovies
router.get("/", (req, res) => {})

//postmovie
router.post("/", (req, res) => {})

//updatemovie
router.put("/:id", (req, res) => {})

//deletemovie
router.get("/:id", (req, res) => {})

export default router
