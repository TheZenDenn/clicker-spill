<script>
  export let vinner = undefined;
  export let callback = () => {console.log('Du vant ' + vinner)}
  let number = ['---'];
  let info = 'Trykk pull for å starte';
  function click() {
      let a = number[0] = Math.round(Math.random()*8+1);
      let b = number[1] = Math.round(Math.random()*8+1);
      let c = number[2] = Math.round(Math.random()*8+1);
      if (number[0] == number[1] && number[0] == number[2]) {
        info = 'Du vinner!';
      } else {
        info = 'Du taper!';
      }

      let d = String(a) + String(b) + String(c)
      vinner = Number(d)
      callback()
      console.log(d)
  }

</script>
<!--
  @component
  `vinner = undefined`
  `callback`
-->
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
  <br>
  <hr>
  <br>
  <div class=button>
  <button on:click={click}>Pull</button>
  </div>
</div>
</body>
<style>
  body {
    margin-top: 5%;
  }
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
    border: solid;
    border-width: 1px;
    border-color: gainsboro;
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