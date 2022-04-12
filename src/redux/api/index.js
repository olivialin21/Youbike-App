import axios from "axios"
import jsSHA from "jssha"

function getAuthorizationHeader() {
   //  填入自己 ID、KEY 開始
      let AppID = process.env.REACT_APP_TDX_ID ;
      let AppKey = process.env.REACT_APP_TDX_KEY ;
   //  填入自己 ID、KEY 結束
      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA('SHA-1', 'TEXT', {
         hmacKey: { value: AppKey, format: "TEXT" },
     });
     ShaObj.update('x-date: ' + GMTString);
     let HMAC = ShaObj.getHMAC('B64');
     let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
     return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}

export const getBikeStation = () => {
  return axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taipei&format=JSON`,
  {
     headers: getAuthorizationHeader()
  }
  )
}