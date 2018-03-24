### Todo lists(angular 5) 
#### All described below are tested and correctly works in MAC OS or Ubuntu

### Check your versions libs
1. node -v // v8.10.0
2. npm -v // 5.8.0

### Init project 
1. Enable in IDE tslint(tslint.json)
2. Enable in IDE stylelint(.stylelintrc)

## Deploy to dev
1. Merge data to dev get branch 
2. run commands:
  - npm ci // works a little faster than yarn
  - npm run build // make app build and brotli compression https://github.com/google/brotli
3. create build commit and push him

## Code style indents:
1. Tab size: 2
2. Indent: 2
3. Continuation indent: 2

####development(webpack dev server http://localhost:4200)
 npm run serve:dev
 serve:dev:hmr

####production
 npm run build // production build

### Update npm(Find newer versions of dependencies than what your package.json allows)
1. npm install -g npm-check-updates
2. ncu --stylelint
3. ncu -a
4. npm i

### Headers:
1. Content-Type: node -vmultipart/form-data - send data with files
2. Content-Type: application/json - send json data
   
### DESCRIPTION
 - Qioon site description

### HTTP response	Description
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status


### Compression
 - Add brotli in nginx
 
### TS 
// tslint:disable:max-line-length

