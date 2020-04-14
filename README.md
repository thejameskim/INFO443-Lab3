# INFO443-Lab3

1. Clone your forked repo into your local machine
2. `cd` into the repo
3. Create a development branch separate from master via `git checkout -b dev`
4. Set up compiler configuration file tsconfig.json via `tsc --init`
5. Enter command `npm install --save @types/node` to be able to use ES6 types in your function
6. Code your design for the given specifications in problem-a.ts
7. Test your changes by compiling the .ts file via `tsc ./exercises/twitter.ts`  or `tsc --watch ./exercises/twitter.ts` to auto-recompile on file save
8. Read the exercise and try to refactor the given code so it has better style
8. Run the script via `node ./exercise/twitter.js` and check if your code gives the intended result
9. If your code passes the tests, `add`, `commit`, and `push` your code to `dev`.
10. Create a pull request to merge your commits from `dev` into `master` in **your** repository, rather than the repo you forked from.
