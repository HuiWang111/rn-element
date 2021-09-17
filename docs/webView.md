# WebView

### WebView与web页面通讯问题
```tsx
// web端
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { observer } from 'mobx-react-lite'
import { offlineRequest } from 'utils/httpUtils'
import { AxiosResponse } from 'axios'
import { transformBase64ToBlob, transformBlobToBase64 } from 'utils'

export const Dashboard: FC = observer(() => {
    const [text, setText] = useState('')
    const [base64, setBase64] = useState('')

    useEffect(() => {
        const run = async () => {
            await offlineRequest.put('/text', { text: '这是从indexDB中拿到的数据' })
            const res: AxiosResponse | undefined = await offlineRequest.get('/text')

            if (res?.data[0]) {
                setText(res.data[0].text)
            }
        }

        run()

        /**
         * 定义一个全局函数接受RN端传递的参数，该函数在RN端运行
         * 接收到 base64转成 Blob 再转成 File传给后端
         */
        window.getDataFromApp = function(json: Record<string, any>) {
            try {
                setBase64(json.file)
                const blob = transformBase64ToBlob(json.file)
                const f = new File([blob], '一张图片');
            } catch (e) {
                console.error(e)
            }
        }
    }, [])

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            for (const file of e.target.files) {
                try {
                    const base64 = await transformBlobToBase64(file)
                    /**
                     * ts中Window默认没有这个属性，需要使用类型声明文件声明 
                     */
                    window.ReactNativeWebView?.postMessage?.(JSON.stringify({ type: 'upload', file: base64 }))
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    return (
        <Row align='middle' justify='center' style={{ height: 300 }}>
            <Col>
                <p>{ text }</p>
                <p>从app获得base64：{ base64 }</p>
                <div>
                    <input type="file" onChange={handleInputChange} />
                </div>
            </Col>
        </Row>
    )
})
```

```ts
// global.d.ts
interface Window {
    ReactNativeWebView?: any;
    getDataFromApp: (data: any) => void;
}
```

```tsx
// react-native端
import React, {useRef} from 'react';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import RNFS from 'react-native-fs';

const App = () => {
  const webViewRef = useRef<WebView | null>(null);

  const handleMessage = async (event: WebViewMessageEvent) => {
    const data: Record<string, any> = JSON.parse(event.nativeEvent.data);

    if (data.type === 'upload') {
     /**
      * 实际开中需要使用UUID生成一个随机文件名
      */
      const filePath = RNFS.DocumentDirectoryPath + '/1.txt';

      try {
        if (!(await RNFS.exists(filePath))) {
          await RNFS.writeFile(filePath, data.file);
        }
        const fileContent = await RNFS.readFile(filePath);
        const json = {
          type: 'upload',
          file: fileContent,
        };

        /**
         * 调用web端定义的函数，传递参数给web端
         */
        webViewRef.current?.injectJavaScript(
          `window.getDataFromApp(${JSON.stringify(json)})`,
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <WebView
      source={{uri: 'http://10.0.6.23:5001/'}}
      onMessage={handleMessage}
      ref={webViewRef}
    />
  );
};

export default App;
```

### Blob与base64互转
```ts
export function transformBlobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        if ((blob instanceof Blob)) {
            const reader = new FileReader()
            
            reader.addEventListener('load', () => {
                resolve(reader.result);
            }, false);
            reader.addEventListener('error', () => {
                reject(`Failed to read file!\n\n${reader.error?.message}`)
            });
            
            reader.readAsDataURL(blob);
        } else {
            reject(`transformBlobToBase64 param must be Blob or File`);
        }
    });
}

function getMineType(config: string): string {
    const conf: string = config.split(':')[1] || '';

    if (!conf) {
        return '';
    }

    return conf.split(';').find(v => v.includes('/')) || '';
}

/**
 * @param sliceSize 切换处理优化性能
 */
export function transformBase64ToBlob(base64: string, sliceSize = 512): Blob {
    const [config, data] = base64.split(',');
    const mineType = getMineType(config);

    const byteCharacters: string = atob(data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
    
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, { type: mineType });
    return blob;
}
```
