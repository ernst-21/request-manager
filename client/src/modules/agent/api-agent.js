const create = async (agent) => {
  try {
    let response = await fetch('http://localhost:8000/api/agent/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch('http://localhost:8000/api/users/', {
      method: 'GET',
      signal: signal
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials) => {
  try {
    let response = await fetch(
      'http://localhost:5000/api/users/' + params.userId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(
      'http://localhost:8000/api/users/' + params.userId,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.t
        },
        body: JSON.stringify(user)
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update };
