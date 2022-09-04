
const {initializeApp, getApps, getApp, applicationDefault, cert} = require('firebase-admin/app')
const {getAuth} = require('firebase-admin/auth');

let adminApp = ''
export let adminAuth = ''
if (getApps().length) {
  adminApp = getApp()
  adminAuth = getAuth(adminApp)
} else {
  const app = initializeApp({
    credential: cert({
      "project_id": "find-me-a-doctor-dev",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsvWurjXO/bc0D\nZdaZX8sI3itMngp3ADctVVYJo16KWa/LVgmDPoETm7LJIyW3yvxTYqZO6oSPpMIP\nwQRAxwPUKSdXYE3AhZwlk10GTW8T9qQIF4WqBrHk6uQejZXtjNr2xRFub5axtTsk\n+32BkfOH80hnxIhop0nFPegM3E5DUT12mGFCO+iNFK6chIbQSAn2TQF7XUxBVscP\nxCCmuBz3afiqFDJCmK0gDtlbIwRgMRD8+GZioBWexAKg4t/XVKWNy+cXfllCqsmF\nm0cFO5Wx5xulF0opS8na0AHG541DdM8VgyOr9bSsB0cr+jutPCVx/1hODFp85Gok\nTYq+VvppAgMBAAECggEAFIlwLL0UYPLVVBU2WHWBunAMgo9LE/cV+EksIZj3V1g+\nnNyBpMWIe8vv63cm57UlvuWse1cpM7k9O7mBT5DBqSaL53jbAZu48uQ0Y/iOj1ds\nTMx8Hxjs6zgMbz/6zltn2H0ZO5Gff0j6S0UtmJshMp13UyPz6kpSTFWV+jpygRDs\nadTdhrVtYKA3hnQFYs3t7jt/G8yEhsFh8NMoFGpz6Ty8/XiSHjSEkb4dfCgOj+NV\nAUC8nFHL0WOahg0GcLZspJ3GFqGhp+iRktXi6HfMFOd3JUalDS0kjzlzBO3/Z/GL\n8CMSECMctDhZpeUexWpwfu8aEvhDXnsp4oD+rpWSgQKBgQDYKAPTeY3uaU1ow4bK\nC/bUCLtnRVi8NzO8klY/B3PfxQD8FcmPjg/F+v540jZc3HjeK8Ce2A76V1EaUwHg\niktP5/+X7/jE7xq7EP5eFzAI9dfvSmccJlLLGQMwb26txpkjWIyOoAUL5Zduwb0w\nQrncVWjwFPDmvtq6BiJj8at36QKBgQDMlKxOFyxxxi+C1rwjSnccPNgN9eERVaeg\n0JedjP9nVROGficoFzVlHysjjLjVZkJzczSWtixyxaeWGzSYUrRVSfw9M6m6TnAk\nSpVeo/kkAiSq4uP7iNl4cVxPvvm+L6tIQt3gVT1cu1imP5uDCNrHALbigo2xYUbT\nHbd10KhegQKBgENmPsMrDNGBLizzgszvbBhzXJP38JJHmC89Zf0jQsNMd2EjHgVQ\nI6T0/XIJAgB0ko+cDuS4s/rlTRmrNlOga5lP2seygNxPPgOEafxGuKiil6E6juod\nHQXNF8x7goRW/5sg2jsCtHAgN9bGPEqXE8MbMqxhqzgX3LXSgdiuG2w5AoGAM+TC\nkExwiausAZRWxNzuucr1QxVLsgn4K2K+EsjhQGTkPwlhBVpdwPjXCH15pSf7Uy21\n+UTcoYBhskHUZY8VD01lHmEsfIXJDGue2BLf77Jber1y9ysPfu3CbLgUwZl16S6M\n+YqlthAPvJwF5ocod7JGsc5MAuKaBJNVJh13mAECgYEAqlv81yPReKxVmq6lszfk\n4vb0TqCHMJA+YH3vQxfqqLJwYPkF0PZaUb770nGHaxdppb62ybfcpfKPRdnRSC79\n5ljnXL/peWqEDWjx63XSSjJJ2dz5iDGxQGlKhRiGYmxnDdBtm66K4YEkfHfduRrk\n3t5YjCDcd5QHL4tOKiqQYvE=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-vvbm7@find-me-a-doctor-dev.iam.gserviceaccount.com",
    })
  });

  adminAuth = getAuth(app)
}
export default adminApp
