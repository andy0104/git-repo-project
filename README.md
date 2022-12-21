# Github Repository Checker Project

##Steps to run the project:

 > Clone the repository
### `git clone https://github.com/andy0104/git-repo-project.git`

 > Move into the repository folder
### `cd git-repo-project`

 > Install dependencies
### `npm install`

 > Run the project
### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5100](http://localhost:5100) to view it in the browser.

## Query to get all the repos:
> Query
```
query ExampleQuery($ownerName: String!) {
  repos(ownerName: $ownerName) {
    name
    owner
    size
  }
}
```
> Input values
```
{
  "ownerName": "bradtraversy"
}
```

## Query to get the repo details
> Query
```
query ExampleQuery($filter: DetailsQuery!) {
  details(filter: $filter) {
    content
    files
    name
    owner
    size
    type
    webhooks
  }
}
```
> Input values:
```
{
  "filter": {
    "ownerName": "andy0104",
    "repoName": "lib"
  }
}
```

