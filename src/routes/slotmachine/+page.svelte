<script>
  let number = ['---'];
  let info = 'Trykk pull for å starte';
  function click() {
    number[0] = Math.round(Math.random()*9);
    number[1] = Math.round(Math.random()*9);
    number[2] = Math.round(Math.random()*9);
    if (number[0] == number[1] && number[0] == number[2]) {
      info = 'Du vinner!';
    } else {
      info = 'Du taper!';
    }
  }

</script>
<body>
<br>
<hr id=hr>
<h1>Slotmachine</h1>
<hr id=hr>
<div class=container>
  <div class=content>
  {info}
  </div>
  <div id=reels>
  {#each number as n}
    {n}
  {/each}
  </div>
  <hr>
  <div class=button>
  <button on:click={click}>Pull</button>
  </div>
</div>
</body>
<style>
  #hr {
    width: 30%;
  }
  .container {
    padding: 10%;
  }
  h1 {
    display: flex;
    justify-content: center;
  }
  button {
    font-size: 115%;
    color: darkslategrey;
    width: 30%;
    padding: 20px;
    background-color:whitesmoke;
    border: none;
    transition: 0.2s;
    
  }
  button:hover {
    color: white;
    background-color: gainsboro;
    cursor: pointer;
  }
  .button {
    display: flex;
    justify-content: center;
    
  }
  #reels {
    display: flex;
    justify-content: center;
    font-size: 250%;
  }
  .content {
    display: flex;
    justify-content: center;
  }
</style>