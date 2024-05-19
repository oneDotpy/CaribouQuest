fetch('http://localhost:3001/protected/profile', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    token: "",
  }),
}).then((response) => {
    if (response.status == 200) {
      return response.token;
    } else {
      throw new Error("Something went wrong");
    }
}).then((response) => {
  console.log(response.token);
});