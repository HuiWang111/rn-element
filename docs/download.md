# 实现App内下载并安装更新包

[参考链接](https://blog.csdn.net/weixin_42284466/article/details/84898859)

### 新增文件
1. DownloadApk.java
```java
package com.XXX; // XXX为包名，与MainApplication.java或MainActivity.java的保持一致即可

import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.Context;
import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DownloadApk extends ReactContextBaseJavaModule {

    public static String description;

    DownloadManager downManager;
    Activity myActivity;

    public DownloadApk(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DownloadApk";
    }

    @ReactMethod
    public void downloading(String url, String description) {
        DownloadApk.description = description;

        myActivity = getCurrentActivity();
        downManager = (DownloadManager)myActivity.getSystemService(Context.DOWNLOAD_SERVICE);
        Uri uri = Uri.parse(url);
        DownloadManager.Request request = new Request(uri);

        // 设置允许使用的网络类型，这里是移动网络和wifi都可以
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);

        //设置通知栏标题
        request.setNotificationVisibility(Request.VISIBILITY_VISIBLE);
        request.setMimeType("application/vnd.android.package-archive");
        request.setTitle("下载");

        if (description == null || "".equals(description)) {
            description = "目标apk正在下载";
        }

        request.setDescription(description);
        request.setAllowedOverRoaming(false);

        // 设置文件存放目录
        request.setDestinationInExternalFilesDir(myActivity, Environment.DIRECTORY_DOWNLOADS, description);

        long downloadid = downManager.enqueue(request);
        SharedPreferences sPreferences = myActivity.getSharedPreferences("ggfw_download", 0);
        sPreferences.edit().putLong("ggfw_download_apk", downloadid).commit();
    }
}
```

2. DownloadApkPackage.java
```java
package com.XXX; // XXX为包名，与MainApplication.java或MainActivity.java的保持一致即可

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DownloadApkPackage implements ReactPackage {

    @Override
    public List createNativeModules(ReactApplicationContext reactContext) {
        List modules = new ArrayList<>();
        modules.add(new DownloadApk(reactContext));
        return modules;
    }

    // @Override
    public List createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

3. DownLoadBroadcastReceiver.java
```java
package com.XXX; // XXX为包名，与MainApplication.java或MainActivity.java的保持一致即可

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.widget.Toast;
import java.io.File;
import android.app.Service;
import android.os.Build;
import android.support.v4.content.FileProvider;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {

    public void installApp(Context context) {

        File file = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), DownloadApk.description);

        if (file.exists()) {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            // 由于没有在Activity环境下启动Activity,设置下面的标签
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            if (Build.VERSION.SDK_INT >= 24) { //判读版本是否在7.0以上
                // 参数1 上下文, 参数2 Provider主机地址 和配置文件中保持一致, 参数3  共享的文件
                Uri apkUri = FileProvider.getUriForFile(context, BuildConfig.APPLICATION_ID + "" + ".fileprovider", file);
                // 添加这一句表示对目标应用临时授权该Uri所代表的文件
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
            } else {
                intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
            }
            context.startActivity(intent);
        } else {
            Toast.makeText(context, "安装包下载失败", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {

        long myDwonloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sPreferences = context.getSharedPreferences("ggfw_download", 0);
        long refernece = sPreferences.getLong("ggfw_download_apk", 0);

        if (refernece == myDwonloadID) {
            DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            DownloadManager.Query querybyId = new DownloadManager.Query();

            querybyId.setFilterById(myDwonloadID);
            Cursor myDownload = dManager.query(querybyId);
            String dolownname = null;

            if (myDownload.moveToFirst()) {
                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));

                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    installApp(context);
                } else {
                    Toast.makeText(context, "下载失败，删除残留文件", Toast.LENGTH_LONG).show();
                    dManager.remove(myDwonloadID);
                    myDownload.close();
                    return;
                }
                myDownload.close();
            }

            if (dolownname == null) {
                return;
            }
        }
    }
}
```

### 修改文件
1. MainApplication.java
```java
import com.XXX.DownloadApkPackage; // <-- 引入DownloadApkPackage，XXX为包名，与头部package com.XXX保持一致

public class MainApplication extends Application implements ReactApplication {
    // ...

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
          getApplicationContext(), BuildConfig.DEBUG, "http://211.95.28.171:8900/"));
      packages.add(new CustomToastPackage());
      packages.add(new ZpcpclPackage());
      packages.add(new OpenSettingsPackage());
      packages.add(new RNReactPackage());
      packages.add(new DownloadApkPackage()); // 增加这一行
      return packages;
    }
}
```

### XML
1. 在android\app\src\main\res文件夹下，新建xml文件夹，在xml文件夹中新建file_paths.xml文件，其内容为
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
	<paths>
		<external-path path="" name="download" />
	</paths>
</resources>
```

2. 编辑android\app\src\main\res\AndroidManifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<application>
    
    <!-- 新增权限 -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <!-- ... -->
    <!-- 新增如下代码 -->

    <receiver android:name="com.(这里改成你的包名).DownLoadBroadcastReceiver">
        <intent-filter>
            <action android:name="android.intent.action.DOWNLOAD_COMPLETE"/>
        </intent-filter>
    </receiver>
    <provider
        android:name="android.support.v4.content.FileProvider"
        android:authorities="${applicationId}.fileprovider"
        android:grantUriPermissions="true"
        android:exported="false">
        <!-- 元数据 -->
        <meta-data
            android:name="android.support.FILE_PROVIDER_PATHS"
            android:resource="@xml/file_paths" />
    </provider>

</application>
```

### 使用
```js
import {
  NativeModules
} from 'react-native';

// 接收两个参数，第一个为安装包下载的url，第二个为保存在本地的文件命名
NativeModules.DownloadApk.downloading('http://www.xxx.com/tes.apk', 'file.apk');
```
