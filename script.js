function throttle(callback, delay) {
    let lastCallTime = 0;
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;

    function throttled(...args) {
        const now = Date.now();
        lastArgs = args;
        lastThis = this;

        const remaining = delay - (now - lastCallTime);

        // First call OR delay passed
        if (remaining <= 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastCallTime = now;
            callback.apply(lastThis, lastArgs);
            lastArgs = lastThis = null;
        } 
        // Schedule trailing call
        else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastCallTime = Date.now();
                timeoutId = null;
                callback.apply(lastThis, lastArgs);
                lastArgs = lastThis = null;
            }, remaining);
        }
    }

    // Cancel method
    throttled.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = lastThis = null;
    };

    return throttled;
}

module.exports = throttle;