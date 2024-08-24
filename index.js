const post_btn = document.getElementById("post_btn");
const message = document.getElementById("message");
const username = document.getElementById("username");


post_btn.addEventListener("click", (event) => {
    event.preventDefault()
    postData(username.value,message.value)
})


async function postData(username, message) {
  try {
      const response = await fetch("https://zcross.pythonanywhere.com/add", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, message })
      });
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data);
      alert('Your message has been submitted!');
      
      // Clear the form
      document.getElementById('username').value = '';
      document.getElementById('message').value = '';
  } catch (error) {
      console.error('Error posting message:', error);
      alert('There was an error posting your message. Please try again.');
  }
}