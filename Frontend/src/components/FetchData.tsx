// const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')
// const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMTk2N2M1Yy02ZjViLTQ5OWQtOGE2Yy1kM2E5Mzc2Y2VhYTQiLCJlbWFpbCI6InJha3NoaXRodmsxOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGFjZjJkYzQ4YmNiZTllM2E2ZjkiLCJzY29wZWRLZXlTZWNyZXQiOiI0Y2UyNmVhNjk2YjY4NmQ2YzU2OTkxYzYwMzZhM2M0YjNhNjM3MTJiYTAxOGViZjEzYzM0NWIxMjNiZmRjYzYzIiwiaWF0IjoxNzEyMjg1MTI3fQ.5he297Xol9xfhSYNEZv74CUYsyDt0WOcsP4LNd6be4c

// const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "path/to/file.png";
    
//     const file = fs.createReadStream(src)
//     formData.append('file', file)
    
//     const pinataMetadata = JSON.stringify({
//       name: 'File name',
//     });
//     formData.append('pinataMetadata', pinataMetadata);
    
//     const pinataOptions = JSON.stringify({
//       cidVersion: 0,
//     })
//     formData.append('pinataOptions', pinataOptions);

//     try{
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: "Infinity",
//         headers: {
//           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//           'Authorization': `Bearer ${JWT}`
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }
// pinFileToIPFS()
