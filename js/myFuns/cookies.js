function getCookies() {
    let queryArray = document.cookie.split(';');
    let cookies = {};
    queryArray.map(function(ele) {
        let arr = ele.split('=');
        arr[0] = arr[0].trim()
       cookies[arr[0]] = arr[1]
    });
    return cookies;
}

function isInCookies(key,val){
    let coo = getCookies();
    if(coo[key] == val)
        return true
    return false
}


export {isInCookies,getCookies}