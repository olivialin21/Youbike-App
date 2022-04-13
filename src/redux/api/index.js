import axios from "axios"
import jsSHA from "jssha"

const getAuthorizationHeader = function() {
	var AppID = process.env.REACT_APP_TDX_ID;
	var AppKey = process.env.REACT_APP_TDX_KEY;

	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

export const getBikeStations = async (filter) => {
  return await axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?%24spatialFilter=nearby(25.047675%2C%20121.517055%2C%201000)&%24format=JSON`,
    {
      headers: getAuthorizationHeader()
    }
  )
}