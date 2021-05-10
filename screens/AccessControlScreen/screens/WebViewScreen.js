import React, {useState} from 'react';
import {WebView} from 'react-native-webview';

export default function WebViewScreen({route, navigation}) {
    const [renderedOnce, setRenderedOnce] = useState(false);
    const updateSource = () => {
        setRenderedOnce(true);
    };
    const { location } = route.params;
    return (
        <WebView
        testID="WVS_ID"
        originWhitelist={['*']}
        source={renderedOnce ? {uri: location} : undefined}
        style={{flex: 1}}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        onLoad={updateSource}
        
    />
    );
}