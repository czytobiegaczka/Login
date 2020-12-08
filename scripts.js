function push_Login() {
  var haslo_nkod = document.getElementById("password");
  var haslo_kod = SHA256(haslo_nkod.value);

  // przygotowanie danych o logowaniu do wysyłki na serwer 
  let dane_auth = {
    username: document.getElementById("username").value,
    password: haslo_kod,
  };

  let opcje_auth = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dane_auth),
  };
              let ip = location.host;
            let url_adress = "http://" + ip + "/month"

  fetch(url_adress, opcje_auth) // wysyłka danych o logowaniu na serwer
    .then((res) => {
      /*
        W odpowiedzi dostajemy jak "bajty" token
        {
        token: string
        }
      */
      //zamiana odpowiedzi na json
      return res.json();
    })
    .then((text) => {
      console.log("text: " + text);
      const url = `/red${text.token}`
      window.location.assign(url);
      })
    .catch(function(err) {
    // Error: response error, request timeout or runtime error
    console.log('promise error! ', err);
    });
}

