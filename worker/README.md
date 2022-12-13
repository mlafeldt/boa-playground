Deploy a Cloudflare Worker that runs the JS code passed in the POST body and returns the result:

```console
wrangler publish

curl https://boa-worker.YOURDOMAIN.workers.dev --data 'const a = 1; const b = 2; `a + b = ${a + b}`'

curl https://boa-worker.YOURDOMAIN.workers.dev --data-binary @YOURCODE.js
```
