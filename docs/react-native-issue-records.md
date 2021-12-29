# React Native Issue Records

## keyboard push absolute view off screen
[Setting `android:windowSoftInputMode="adjustNothing"` on the MainActivity in `AndroidManifest.xml` to completely disable the automatic keyboard resizing was my workaround. I then do all the keyboard resizing/scrolling logic myself.](https://github.com/facebook/react-native/issues/6785)