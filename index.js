const express = require("express");


const app = express();
const port = 5000;

app.use(express.json())

const logger = require("morgan");

let {foos} = require("./foos.json");
let {jobs,companies} = require("./data.json");


app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Home");
});
// foos
app.post("/foos", (req, res) => {
  foos.push({...req.body});
  res.send(foos)
});

app.get("/foos", (req, res) => {
  res.send(foos);
});

app.patch("/foos/:id", (req, res) => {
    let idx = foos.findIndex(f => {
    return f.id === parseInt(req.params.id)
  });
  
    let foo = foos[idx]
  foos[idx] = {
    ...foo,
    ...req.body
  } 
  console.log(idx)
  res.send(foos);
});

app.delete("/foos/:id", (req, res) => {
  foo = foos.filter(f => {
    return f.id !== parseInt(req.params.id)
  })
  foos = foo
  res.send(foos);
});

app.get("/alljobs", (req, res) => {
  res.send(jobs);
});

app.get("/allcompanies", (req, res) => {
  res.send(companies);
});
// jobs 

app.get("/jobs", (req, res) => {
  let jobsList = []
  const {page,companyName,title,city,skills} = req.query
  if (!page) {
    jobsList = jobs.slice(0,20)
  }
  // page
  if (page>=2) {
    console.log(page)
    jobsList = jobs.slice((page-1)*20,page*20)

  }
  if (page<2) {
    console.log(page)
    jobsList = jobs.slice(0,20)
  }
  if (page > ((jobs.length-jobs.length%20)/20)) {
    res.send("You have reached the last page of jobs!")    
  }
// company name 
  if (companyName) {
    let company = companies.filter(c => c.name === companyName) 
    console.log(company)
    jobsList = jobs.filter( j => j.companyId === company[0].id)
  }
// title 
  if (title) {
    jobsList = jobs.filter(j => j.title.includes(title)) 
  }
// city
  if (city) {
    jobsList = jobs.filter(j => j.city.includes(city))
  }
// skills
  if (skills) {
    jobsList = jobs.filter(j => j.skills.includes(skills))
    console.log(jobs[0].skills.includes(skills))
  }
  console.log(jobsList.length)
  res.send(jobsList)
});

app.patch("/jobs/:id", (req, res) => {
  let idx = jobs.findIndex(j => {
  return j.id === req.params.id
});
  console.log(idx)
  let job = jobs[idx]
  jobs[idx] = {
  ...job,
  ...req.body
} 



res.send(jobs[idx]);
});

app.delete("/jobs/:id", (req, res) => {
  job = jobs.filter(j => {
    return j.id === req.params.id
  })
  jobs = jobs.filter(j => {
    return j.id !== req.params.id
  })
  res.send(job);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});