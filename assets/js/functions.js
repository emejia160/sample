function checkPermission(item) {
    const isUIWebview = /(iPhone|iPod|iPad).*AppleWebKit(?!state.*Safari)/i.test(navigator.userAgent);
    if (typeof navigator.userAgent !== undefined && /android/i.test(navigator.userAgent)) {
      return Android.checkPermissionWebView(item);
    } else if (isUIWebview) {
      const state = false;
      const promise = new Promise((resolve, reject) => {
        const callback = (event) => {
          resolve(event.data);
          window.removeEventListener('message', callback);
        }
        window.addEventListener('message', callback);
      });
      this.window.webkit.messageHandlers.checkPermissionWebView.postMessage(item);
      return promise;
    } else {
      return true;
    }
  }
  
  function requestPermissionLaunch(item) {
    const isUIWebview = /(iPhone|iPod|iPad).*AppleWebKit(?!state.*Safari)/i.test(navigator.userAgent);
    if (typeof navigator.userAgent !== undefined && /android/i.test(navigator.userAgent)) {
      return Android.requestPermissionLaunch(item);
    } else if (isUIWebview) {
      const promise = new Promise((resolve, reject) => {
        const callback = (event) => {
          resolve(event.data);
          window.removeEventListener('message', callback);
        }
        window.addEventListener('message', callback);
      });
      this.window.webkit.messageHandlers.requestPermissionLaunch.postMessage(item);
      return promise;
    } else {
      return true;
    }
  }
  
