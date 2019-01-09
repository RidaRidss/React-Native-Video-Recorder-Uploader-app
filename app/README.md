# Ziggeo ReactNativeSDK Demo

### Automatic Installation
```
$ npm install react-native-ziggeo-library --save
$ react-native link
```

iOS project will require additional steps mentioned at the Manual Installation section below  
Android project also requires to follow point 2 and point 3(the first part) mentioned at the Manual Installation section below  

### Manual Installation
#### Android
1. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-ziggeo-library'
  	project(':react-native-ziggeo-library').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-ziggeo-library/android')
  	```

2. Open up `android/build.gradle`
	- Insert the following line inside the `allprojects/repositories` block:
	```
	maven { url 'https://jitpack.io' }
	```
  	
3. Open up `android/app/build.gradle`
	- Set `compileSdkVersion` and `targetSdkVersion` = `28`, `minSdkVersion` >= `16`, `buildToolsVersion` = `28.0.3`, all libs from `com.android.support` package to `28.0.0`.
	- Insert the following line inside the `dependencies` block:
	```
	compile project(':react-native-ziggeo-library')
	```

4. Open up `android/app/AndroidManifest.xml` 
	- Insert the following line inside the `manifest` block:
	```
	xmlns:tools="http://schemas.android.com/tools"
	```
	- Insert the following line inside the `application` block:
	```
	tools:replace="android:name"
	```

5. Open up `android/app/src/main/java/[...]/MainActivity.java`
  	- Change `extends ReactActivity` to `extends ReactFragmentActivity`
  	- Add `import com.ziggeo.ZiggeoPackage;` to the imports at the top of the file

6. Open up `android/app/src/main/java/[...]/MainApplication.java`
  	- Add `new ZiggeoPackage()` to the list returned by the `getPackages()` method

#### iOS
1. `$ npm install react-native-ziggeo-library --save`
2. `$ react-native link`
3. download `Ziggeo.framework` from `Ziggeo-Client-SDK` repository: https://github.com/Ziggeo/iOS-Client-SDK/tree/master/Ziggeo/Output/

There are two framework versions: release and universal. Use universal framework for development and debugging purposes and switch to Release framework to build the application for App Store

4. open the iOS project in XCode and add the Ziggeo.framework into embedded and linked frameworks at the project settings

Sometimes iOS project compilation may raise analyzer issues. Use these commands to clean and build the project from scratch:
```
$ cd ios
$ rm -rf build
$ xcodebuild clean
```

## Usage
```javascript
import Ziggeo from 'react-native-ziggeo-library';
```
