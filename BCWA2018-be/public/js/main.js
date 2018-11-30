'use strict';

const frm = document.querySelector('#mediaform');
const updatefrm = document.querySelector('#updateform');
const list = document.querySelector('#imagelist');
const deleteButton = document.querySelector('#updateform button[id=delete]');
const searchButton = document.querySelector('#searchButton');


const fillUpdate = (image) => {
  console.log(image);
  document.querySelector('#updateform input[name=mID]').value = image.mID;
  document.querySelector('#updateform input[name=category]').value = image.category;
  document.querySelector('#updateform input[name=title]').value = image.title;
  document.querySelector('#updateform input[name=details]').value = image.details;
};

const getImages = () => {
  fetch('/images').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    list.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h3');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbnails/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
      });
      li.appendChild(img);
      list.appendChild(li);
    });
  });
};

const sendForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getImages();
  });
};

const sendUpdate = (evt) => {
  evt.preventDefault();
  const settings = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: document.querySelector('#updateform input[name=title]').value,
      category: document.querySelector('#updateform input[name=category]').value,
      details: document.querySelector('#updateform input[name=details]').value,
      mID: document.querySelector('#updateform input[name=mID]').value,
    }),
  };
  // app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
  fetch('images', settings).then((response) => {
    return response.json();
  }).then((json) => {
    updatefrm.reset();
  }).catch((err) => {
    console.log(err);
  });
  getImages();
};

const deleteImage = (evt) => {
  const settings = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mID: document.querySelector('#updateform input[name=mID]').value,
    }),
  };
  fetch('images', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    updatefrm.reset();
  }).catch((err) => {
    console.log(err);
  });
  getImages();
};

const searchImages = (evt) => {
  evt.preventDefault();
  const settings = {
    method: 'GET',
  };
  const title = document.querySelector('#searchKeyword').value;
  fetch('search?title=' + title, settings).then((response) => {
    return response.json();
  }).then((json) => {
    list.innerHTML = '';
    json.forEach((image) => {
      const li = document.createElement('li');
      const title = document.createElement('h2');
      title.innerHTML = image.title;
      li.appendChild(title);
      const img = document.createElement('img');
      img.src = 'thumbnails/' + image.thumbnail;
      img.addEventListener('click', () => {
        fillUpdate(image);
      });
      li.appendChild(img);
      list.appendChild(li);
    });
  }).catch((err) => {
    console.log(err);
  });
};


frm.addEventListener('submit', sendForm);
updatefrm.addEventListener('submit', sendUpdate);
deleteButton.addEventListener('click', deleteImage);
searchButton.addEventListener('click', searchImages);

getImages();
