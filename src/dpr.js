((_document, _window)=>{

    // 计算dpr
    const navigatorUserAgent = _window.navigator.userAgent; // 获取请求的用户代理头
    const iPhone = navigatorUserAgent.indexOf('iPhone');     // 判断是否是iphone
    let dpr, one_dpr;                                         // 设备的dpr值和页面的缩放比例


    // 根据是否为iphone，计算屏幕的缩放比例
    if(iPhone > -1){
        dpr = Number(_window.devicePixelRatio);
        one_dpr = 1 / dpr;
    }else{
        dpr = 1;
        one_dpr = 1;
    }

    _document.write(`<meta name="viewport" content="width=device-width, initial-scale=${ one_dpr }, maximum-scale=${ one_dpr }, minimum-scale=${ one_dpr }, user-scalable=no">
                     <meta name="flexible" content="initial-dpr=${ dpr }">`);


    // 计算html的字体大小
    const html = _document.getElementsByTagName('html')[0];
    const F0 = 75;                       // 以iphone6的750 / 10为基准计算
    html.setAttribute('data-dpr', dpr); // 为html添加[data-dpr="x"]的属性

    function getFontSize(event){
        html.style.fontSize = F0 * _window.innerWidth / 750 + 'px'; // 计算当前窗口下的字体大小
    }


    // 初始化
    getFontSize();
    _window.addEventListener('resize', getFontSize, false);

})(document, window);