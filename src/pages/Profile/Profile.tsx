import React from 'react';

function Profile() {

  function convertToBase64(file) {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-upload" className="custom-file-upload">
        <img src={postImage.myFile || avatar} alt="" />
      </label>

      <input
        type="file"
        lable="Image"
        name="myFile"
        id="file-upload"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleFileUpload(e)}
      />

      <h3>Doris Wilder</h3>
      <span>Designer</span>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Profile;
