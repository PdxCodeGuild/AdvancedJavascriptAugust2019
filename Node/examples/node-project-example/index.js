const axios = require('axios');

// The promise way!
// Promise.all([
//   axios.get('https://jsonplaceholder.typicode.com/posts'),
//   axios.get('https://jsonplaceholder.typicode.com/users')
// ])
// .then(([posts, users]) => {
//   console.log(posts.data[0])
//   console.log(users.data[0])
// })

// The async/await way!
const getPosts = async () => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    const postsWithUsers = await Promise.all(data.map(async (post) => {
      const user = await axios.get('https://jsonplaceholder.typicode.com/users/' + post.userId)

      return {
        ...post,
        user: user.data,
      }
    }))

    console.log(postsWithUsers)
  } catch(err) {
    console.error(err);
  }
}

getPosts()