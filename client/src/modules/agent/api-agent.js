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

const list = async () => await fetch('http://localhost:8000/api/users/', {
  method: 'GET'
});

const read = async (params, credentials) => {
  let response = await fetch(
    'http://localhost:8000/api/users/' + params.userId,
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
};

const update = async (params, credentials, user) => {
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
};

const searchUser = async (name) => {
  let response = await fetch(
    'http://localhost:8000/api/users/search',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    }
  );
  return await response.json();
};

const dragTravelerCard = async (traveler) => {
  let response = await fetch(
    'http://localhost:8000/api/users/dragCard',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        //Authorization: 'Bearer ' + credentials.t
      },
      body: JSON.stringify(traveler)
    }
  );
  return await response.json();
};

export { create, list, read, update, dragTravelerCard, searchUser };
