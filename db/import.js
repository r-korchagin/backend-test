const request = require("request");

let urlPosts = "https://jsonplaceholder.typicode.com/posts";
let urlUsers = "https://jsonplaceholder.typicode.com/users";

/**
 * Return JSON data from url
 * @param {String} url
 * @returns {Promise}
 */
function getDataFromUrl(url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (error, res, body) => {
      if (error) {
        console.error(error);
        reject();
      }

      if (!error && res.statusCode === 200) {
        resolve(body);
      }
    });
  });
}

module.exports = {
  postsData: getDataFromUrl(urlPosts), // Posts data
  usersData: getDataFromUrl(urlUsers) // Users data
};
