This is a base project for Communifire Mobile App project to develop mobile apps for Communifire using Ionic 3.


### Ionic Mobile App Development Setup

Follow these instructions to setup your Ionic development tools:

1. Install X Code: Apple’s XCode development software is used to build Mac and iOS apps, but it also includes the tools you need to compile software for use on your Mac. XCode is free and you can find it in the Apple App Store.

2. Install Node: Next we need to install Node, download and run the installer from here: https://nodejs.org/en/download/

You can run "node -v" to check your Node version. Also check NPM (Node Package Manager) version using "npm -v" CLI command.

4. Install Ionic: Now you have Node and NPM installed, the next step is to install Ionic:

```bash
$ sudo npm install -g cordova ionic
```

For Windows:
```
npm install -g cordova ionic
```

5. After Ionic is installed, test it by running this command (you must be at the root of your ionic source reprository, example: D:\GitProjects\Communifire-Ionic-App):

```
$ ionic info
```

For Windows:
```
ionic info
```

6. Download Visual Studio Code:

https://code.visualstudio.com/download

7. Next clone this project, and then use command prompt to go inside the cloned project directory. Run the following commands from within the project directory.

8. Install iOS Platform: To build for iOS, we need to add the iOS platform module to Cordova:

```
$ ionic cordova platform add ios
```

NOTE: If above command fails or you are getting the following error "[ERROR] An error occurred while running npm i (exit code 1)" then remove package-lock.json(using following command) and run above command again.
```
rm package-lock.json
```

9. Install Android Platform: To build for Android, you’ll need to add the Android platform module to Cordova:

```
$ ionic cordova platform add android
```

10. Now download and install these node modules in your project:

```
npm install @ngx-translate/core @ngx-translate/http-loader@0.1.0 --save
```

Next Install Angular2 Moment plugin
```
npm install --save angular2-moment
```

11. Next try to run your project in lab mode by executing this:

```
ionic serve -l
```
12. To emulate use these commands: 

```
ionic cordova emulate ios

ionic cordova emulate android
```

13. To run a responsive web page in an  "Electron-like" native fashion, you need to use Ionic team's WKWebView plugin. First install Cordova WKWebView Engine:

```
https://github.com/ionic-team/cordova-plugin-wkwebview-engine#installation-instructions
```

Next install the WKWeBView:

https://www.npmjs.com/package/cordova-plugin-inappbrowser-wkwebview
```
Finally, add your entry in the whitelist section: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/
```

<b>Windows Settings FAQ</b>

If you are getting "[ERROR] Sorry! ionic cordova platform can only be run in an Ionic project directory." error while running "ionic cordova platform add ios" command that means you are not under this "cloned project directory". Let's say you have cloned this project at following location "D:\GitProjects\Communifire-Ionic-App" then you need to go inside that directory via npm command prompt 

D:\GitProjects>cd Communifire-Ionic-App

D:\GitProjects\Communifire-Ionic-App>ionic cordova platform add ios
https://www.screencast.com/t/z0LI5MANuH

14. To enable attachments from iCloud, iCloud must be enabled from capabilites in Xcode.
iCloud container should be added to your App ID from Apple Developer certificates portal, and you need to regenerate the Provisioning profile as well.
Please follow this README on github for more information:
https://github.com/jcesarmobile/FilePicker-Phonegap-iOS-Plugin#prerequisites

<b>Mac OSX FAQ</b>

1. If you get the below error while building your Ionic app on iOS on a Mac, follow the steps to fix it.

```
An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=159)
```

This happens due to the permissions on Mac. Here are the steps you can use to correct this issue:

Empty the 'platforms' folder in your Cordova project.

Re-run Cordova platform add ios, Cordova build ios, and Cordova emulate ios without sudo.

Make sure all the files in your user's home folder actually belong to that user by running:

```
sudo chown -R username /Users/username
```

2. If you get this error while trying to emulate/run on iOS: 

```
"Error: Cannot read property 'replace' of undefined"

[ERROR] An error occurred while running cordova emulate ios (exit code 1).
```

Go to your project folder root (in Terminal), do 

```
cd platforms/ios/cordova

npm install ios-sim
```

3. If you get this error while trying to run/emulate on android: 

```
"Error: Cannot read property 'replace' of undefined"

[ERROR] An error occurred while running cordova emulate android (exit code 1).
```

Follow the steps (copied from https://stackoverflow.com/questions/44687476/cordova-android-emulator-cannot-read-property-replace-of-undefined): 

```
Tracked it down to file /platforms/android/cordova/lib/emulator.js line 202:

var num = target.split('(API level ')1.replace(')', '');

Replace it with a regex search and extraction:

var num = target.match(/\d+/)[0];
```

4. To show a list of iOS devices to target and emulate run this:

```
ios-sim showdevicetypes
```

then select one device as:

```
ionic cordova emulate ios --target="iPhone-7"
```

5. If you get exceptions saying "Requirements check failed for JDK 1.8 or greater" on running following command:

```
ionic cordova --release build android
```

You should install JDK 1.8 otherwise it will not work. To download, go to http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

Now, you need to set your environment variables accroding to 1.8 version of JDK.
Visit https://cordova.apache.org/docs/en/latest/guide/platforms/android/#setting-environment-variables

If you have set your environment variables correctly then above given command should start downloading all gradle dependencies.

6. Error: A problem occurred configuring root project 'android'.
> You have not accepted the license agreements of the following SDK components:

If you get this exception on android build, then try running following command to accept the licence at following location.

```
Location: C:\Users\Sunny\AppData\Local\Android\Sdk\tools\bin
Command: sdkmanager --licenses
```

Goto the location where sdk is located and then goto \tools\bin in command line.
Run above command to accept the licences in the bin directory.

7. Error: processReleaseGoogleServices'.TransferObject } from '@ionic-native/file-transfer

```
https://developers.google.com/mobile/add
```

Register to this site for firebase messaging and download google-service.json file and move it to following location

```
C:\Drive\GitProjects\Communifire-Ionic-App\platforms\android
```


Keep all the folder names in solution in small letters. Do not make them Pascal case else it will give 404 errors in device.

CORS:

UIWebView never enforced CORS, but WKWebView does.

Unfortunately there’s no API to disable this, so you’ll need to ensure any remote API that your app use, implement CORS correctly: CORS MDN Docs

Origin: http://localhost:8080
Reference: https://ionicframework.com/docs/wkwebview/



Issue: "Property 'lift' in type 'Subject<T>' is not assignable to the same property in base type 'Observable<T>'."

Solution: Install npm install --save rxjs@^5.4.2, Reference: https://stackoverflow.com/questions/44810195/how-do-i-get-around-this-subject-incorrectly-extends-observable-error-in-types

Issue: npm modules outdated
Solution: run the following command over the solution "npm update"


DO NOT ADD ^ operator for keyboard plugin and keep it as ("@ionic-native/keyboard": "4.12.0") else the updated version will break the current plugin

