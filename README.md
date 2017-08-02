## Installation
```bash
$ npm i -g cordova ionic
$ git clone https://github.com/Gordeev1/chat
$ cd chat
$ npm i
$ ionic serve
```

## Preparing for production usage
1. Enter facebook app id
```xml
// config.xml
<plugin name="cordova-plugin-facebook4" spec="~1.9.1">
    <variable name="APP_ID" value="<ENTER_YOUR_KEY>" />
    <variable name="APP_NAME" value="Chat" />
</plugin>
```

2. Enter your production server url
```typescript
// src/constants.ts
const BASE_URL = PRODUCTION ? '<ENTER_YOUR_URL>' : 'http://localhost';
```

3. Build app
```bash
$ ionic add [platform_name]
$ ionic build [platform_name] --release
```
4. Sign

    #### IOS 
        
    Do this in xcode

    #### Android

    Bundle now here
        
        platforms/android/build/outputs/apk/android-release-unsigned.apk

    For signing it

    ```bash
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <path_to_your/release.keystore> android-release-unsigned.apk <alias_name>
    $ <path_to_your/zipalign> -v 4 android-release-unsigned.apk <app_name>.apk
    ```
    For more info check - [https://ionicframework.com/docs/v1/guide/publishing.html](https://ionicframework.com/docs/v1/guide/publishing.html)