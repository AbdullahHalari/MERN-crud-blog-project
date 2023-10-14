const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const authenticate = require("./authenticate");

require("../dbcon")

const User = require('../schema/userSchema');
const Post = require('../schema/postSchema');

router.get('/',(req,res)=>{
    res.send("Hello world from the server router js");
});
// router.get("/register", (req, res) => {
//   res.send("Hello wordsdasdld from the server router js");
// });

router.post('/register',async (req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return res.status(422);
    }
    try {
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:'email already exist'})
        }
        const user = new User({
            email:email,
            password:password,
        });
        const userReg = await user.save()
          if (userReg) {
            res.status(201).json({ message: "successfully stored" });
            console.log(userReg);
          } else {
            res.status(500).json({ error: "failed" });
          }
    } catch (error) {
        console.log(error)
    }
})
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "empty fields" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log("token is " + token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 251346464),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "user error" });
      } else {
        res.json({ response: "Success" });
      }
    } else {
      res.status(400).json({ error: "user error" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/postget", async (req, res) => {
  try {
    console.log("results this")
      // const result = Post.find().sort({createdAt: -1}).limit(20)
      //   console.log('result');
      let result = await Post.find();
        res.send(JSON.stringify(result));
    //  res.send(result);
     console.log(result)
   res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", authenticate, async (req, res) => {
  try {
    console.log("root user is "+req.rootUser);
    //for single device
    req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    // for all devices logout
    // req.rootUser.tokens =[];

    res.clearCookie("jwtoken");
    res.status(200).json({ success: true });
    console.log("logout success");
    await req.rootUser.save();
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
router.get("/create", authenticate, (req, res) => {
  console.log("hello ");
  res.send(req.rootUser);
  res.send("hello / world from server");
});

router.post("/post", async (req, res) => {
  const { title, description,date } = req.body;

  if (!title || !description) {
    return res.status(422);
  }
  try {
   
    const post = new Post({
      title: title,
      description: description,
      date:date
    });
    const postReg = await post.save();
    if (postReg) {
      res.status(201).json({ message: "successfully stored" });
      console.log(postReg);
    } else {
      res.status(500).json({ error: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit",async (req, res) => {
  
  // const { token } = req.cookies;
  // jwt.verify(token, secret, {}, async (err, info) => {
  //   if (err) throw err;
    const { id, title, description} = req.body;
    // const postDoc = await Post.findById(id);
    // const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    // if (!isAuthor) {
    //   return res.status(400).json("you are not the author");
    // }
    console.log("body is "+id, title, description);
    const postDoc = await Post.findByIdAndUpdate(id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  })

router.delete("/delete",async (req, res) => {
  
 
    const { id, title, description} = req.body;
    console.log("delete is "+id, title, description);
    const postDoc = await Post.findByIdAndDelete(id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully deleted.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
   
  });
// });
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

module.exports = router;
