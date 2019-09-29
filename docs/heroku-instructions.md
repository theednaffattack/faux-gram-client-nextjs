# Simple deploy instructions for Heroku

from: https://medium.com/@jacoboakley/deploy-a-next-js-app-on-heroku-69bcb01db1b7

---

# Deploy A Next.js App on Heroku

[Jacob Oakley](https://medium.com/@jacoboakley?source=post_page-----69bcb01db1b7----------------------)

[Jul 16, 2017](https://medium.com/@jacoboakley/deploy-a-next-js-app-on-heroku-69bcb01db1b7?source=post_page-----69bcb01db1b7----------------------) · 2 min read

In this article I will tell you how to deploy a basic Next.js App on Heroku. This article will assume you have a Node.js installed and a Github and Heroku account. If you do not have these you should install them and read through their documentation and tutorials to familiarize yourself with them.

---

## 1. Create a project

Open your terminal and navigate to the location you would like to save the project then type the following in your terminal.

```
mkdir my-app
cd my-app
npm init -y
npm install --save react react-dom next
touch .gitignore
mkdir pages
cd pages
touch index.js
cd ..
```

## 2. Add Code to Index.js

```
const Index = () => (<div>
  <p>Hello World!</p>
</div>
)export default Index
```

## 3. Add Code to .gitignore

```
node_modules/
.next/
*.log
```

## 4. Modify package.json

```
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start -p $PORT",
  "heroku-postbuild": "npm run build",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

## 5. Push to Github

Create a new repository in your browser on Github. Then type the following in your root directory.

```
git init
git add .
git commit -m "First Commit"
git remote add origin https://github.com/{username}/{repositoryname}
git push origin master
```

## 6. Create Heroku App

```
heroku create my-app
```

## 7. Deploy on Heroku

**I** Open your browser and sign into Heroku
**II** Navigate to the “Dashboard”
**III** Select your newly created app
**IV** Click “Deploy”
**V** Under “Deployment Method” select “Github”
**VI** Add repository name ({username}/{repositoryname})
**VII** Click “Search”
**VIII** Click “Connect”
**IX** Select Branch
**X** Click “Deploy Branch”
**XI** Click “View”
