import fetch from "node-fetch";
import express from "express";

// JWT token and Userid needed
const MG_API_BASE = "https://mgate.io/api/v2/"
const MG_API_LINKS_USER = MG_API_BASE + "links/user?uid=" + process.env.MG_USERID + "&jwt=" + process.env.MG_JWT + "&hidden=false"

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/links_user", (req, res) => {
	console.log("calling links_user api. fetching mintgate api");
	console.log(`fetching mintgate api on ${MG_API_LINKS_USER}`);

	fetch(MG_API_LINKS_USER)
	.then(resp => {
		 if (resp.ok) {
		    console.log("links user response ok")
		    return resp.json();
		 } else {
		   throw new Error("Oops! Something went wrong");
	         }
        })
	.then(json => {
	    for (let i = 0; i < json.result.length; i++) {
	      json.result[i].username = "hidden";
	      json.result[i].uid = "0";
	    }
	    console.log(json.result); // response body here
	    res.json(json.result);
	})
	 // res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
	  console.log(`Server listening on ${PORT}`);
});
